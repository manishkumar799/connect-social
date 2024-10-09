// custom.d.ts
import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

declare module 'express' {
  export interface Response {
    sendResponse?:any,
    sendError?:any,
  }

  export interface Request {
    user?:any;
  }
}
