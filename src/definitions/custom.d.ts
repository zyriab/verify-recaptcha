import { Request } from 'express';

export interface RequestBody extends Request {
  body: {
    token: string;
  };
}