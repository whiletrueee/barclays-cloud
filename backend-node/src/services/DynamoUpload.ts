/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { Request, Response } from 'express';
import { config } from 'dotenv';

const client = new DynamoDB({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: 'AKIAR3FILEQWNUUYJC7O',
    secretAccessKey: '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',
  },
});

export const dynamoUpload = async (req: Request, res: Response) => {
  const dataArray = req.body;
  console.log(dataArray);
  if (!dataArray) {
    res.status(400).send('No data found');
  }

  const params = {
    RequestItems: {
      userTable: dataArray.map((item: any) => {
        return {
          PutRequest: {
            Item: marshall(item),
          },
        };
      }),
    },
  };

  try {
    const results = await client.batchWriteItem(params);
    res.status(200).send(results);
  } catch (err) {
    res.status(500).send(err);
  }
};
