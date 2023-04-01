/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response } from 'express';
import { getDB } from '../config/database';


export const DBStore = async (req: Request, res: Response) => {
  try {
    const db = await getDB();
    const filestatusCollection = db.collection('filestatus');
    await filestatusCollection.updateOne({
        pointer: 'statusDisplay',
    }, {
        $set: {
            store_DB: 'uploaded',
        }
    })
  } catch (err) {
    res.status(500).send(err);
  }
};
