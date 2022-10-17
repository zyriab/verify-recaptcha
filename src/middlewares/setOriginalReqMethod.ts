import { RequestBody } from "../definitions/custom";

/**
 * Hotfix for a bug with aws-serverless-express proxy transforming all request into GET reqs
 */
export default function setOriginalReqMethod(req: RequestBody, res: any, next: () => void) {
  if(process.env.NODE_ENV === 'production') {
    // @ts-ignore
    req.method = reqMethod;
  }
  next();
}