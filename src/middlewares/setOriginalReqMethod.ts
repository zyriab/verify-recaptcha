import { RequestBody } from '../definitions/custom';
import reqMethodCache from '../utils/reqCache';

/**
 * Hotfix for a bug with aws-serverless-express proxy transforming all request into GET reqs
 */
export default function setOriginalReqMethod(
  req: RequestBody,
  res: any,
  next: () => void
) {
  if (process.env.NODE_ENV !== 'development') {
    req.method = reqMethodCache.method;
  }
  next();
}
