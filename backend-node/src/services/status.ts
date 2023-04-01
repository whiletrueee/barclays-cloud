/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response } from 'express';
import { getDB } from '../config/database';

export const status = async (req: Request, res: Response) => {
  try {
    const db = await getDB();
    const filestatusCollection = db.collection('filestatus');
    const statusdata = await filestatusCollection.findOne({
      pointer: 'statusDisplay',
    });
    res.status(200).send(statusdata);
  } catch (err) {
    res.status(500).send(err);
  }
};
