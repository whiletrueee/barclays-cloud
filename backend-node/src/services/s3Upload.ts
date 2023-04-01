/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Request, Response } from 'express';
import fs from 'fs';
import { getDB } from '../config/database';

const s3Client = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: '',
    secretAccessKey: '',
  },
});

export const s3Upload = async (req: Request, res: Response) => {
  const apiKey = req.headers['api-key'];

  if (!apiKey) {
    res.status(401).send('Missing API Key in header');
  }

  const file = req.file;
  if (!file) {
    res.status(400).send('No data found');
  }

  try {
    const db = await getDB();
    const collection = db.collection('orgUserData');
    const filestatusCollection = db.collection('filestatus');
    const validate = await collection.findOne({
      apiKey,
    });
    if (validate) {
      const found = await filestatusCollection.findOne({
        pointer: 'statusDisplay',
      });

      if (found) {
        await filestatusCollection.updateOne(
          {
            pointer: 'statusDisplay',
          },
          {
            $set: {
              s3_status: 'uploading',
              glue: 'pending',
              store_DB: 'pending',
            },
          },
        );
      } else {
        const status = {
          pointer: 'statusDisplay',
          s3_status: 'uploading',
          glue: 'pending',
          store_DB: 'pending',
        };
        await filestatusCollection.insertOne({
          ...status,
        });
      }

      const data = fs.readFileSync(file.path);

      fs.unlink(file.path, err => {
        if (err) {
          console.error(err);
          return;
        }
        //file removed
      });

      const params = {
        Bucket: 'barclays-cloud',
        Key: file.originalname,
        Body: data,
      };

      const command = new PutObjectCommand(params);
      const result = await s3Client.send(command);
      console.log(`File uploaded successfully. ${result}`);

      await filestatusCollection.updateOne(
        {
          pointer: 'statusDisplay',
        },
        {
          $set: {
            s3_status: 'uploaded',
            glue: 'processing',
          },
        },
      );
      res.send('File uploaded successfully to S3');
    } else {
      throw { message: 'Invalid API Key' };
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
