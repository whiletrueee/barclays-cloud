import { Router } from 'express';
import { dynamoUpload } from '../services/DynamoUpload';
import { accessKey } from '../services/accessKey';
import { s3Upload } from '../services/s3Upload';
import multer from 'multer';
import { GlueStatusUpdate } from '../services/glueStatusUpdate';
import { DBStore } from '../services/dbStore';
import { status } from '../services/status';

export default (): Router => {
  const app = Router();

  const upload = multer({ dest: 'uploads/' });

  app.post('/dynamoUpload', dynamoUpload);
  app.post('/accessKey', accessKey);
  app.post('/bucketUpload', upload.single('file'), s3Upload);
  app.get('/glueStatusUpdate', GlueStatusUpdate);
  app.get('/dbStoreUpdate', DBStore);
  app.get('/status', status);

  return app;
};
