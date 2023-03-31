import express from './express';
import Logger from './logger';
import Express from 'express';
import { getDB } from '../config/database';

export default async ({ expressApp }: { expressApp: Express.Application }): Promise<void> => {
  await getDB();
  Logger.info('✌️ Mongo loaded');

  await express({ app: expressApp });
  Logger.info('✌️ Express loaded');

  Logger.info('✅ All modules loaded!');
};
