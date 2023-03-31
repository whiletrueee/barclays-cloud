import { Router } from 'express';
import { dynamoUpload } from '../services/DynamoUpload';
import { accessKey } from '../services/accessKey';

export default (): Router => {
  const app = Router();

  app.post('/dynamoUpload', dynamoUpload);
  app.post('/accessKey', accessKey);

  return app;
};
