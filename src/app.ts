import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import verifyToken from './utils/verifyToken.utils';
import { RequestBody } from './definitions/custom';
import 'dotenv/config';

const IS_DEV = process.env.NODE_ENV === 'development';

const app = express();
const router = express.Router();

if (!IS_DEV) app.use(helmet());
app.use(bodyParser.json());

// eslint-disable-next-line consistent-return
app.use((req: RequestBody, res, next: any) => {
  // CORS is taken care of in AWS Lambda
  if (IS_DEV) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use('/', router);

router.post('/', async (req: RequestBody, res) => {
  const success = await verifyToken(req.body.token);

  if (success) {
    res.status(200);
    return;
  }

  res.status(400);
  res.json({ message: 'Invalid token' });
});

export default app;
