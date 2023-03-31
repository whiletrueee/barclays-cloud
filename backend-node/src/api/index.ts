import { Router } from 'express';
import { dynamoUpload } from '../services/DynamoUpload';
import { accessKey } from '../services/accessKey';
import { s3Upload } from '../services/s3Upload';
import multer from 'multer';

export default (): Router => {
  const app = Router();
 
  const upload = multer({ dest: 'uploads/' });

  app.post('/dynamoUpload', dynamoUpload);
  app.post('/accessKey', accessKey);
  app.post('/bucketUpload', upload.single('file'), s3Upload);

  return app;
};
