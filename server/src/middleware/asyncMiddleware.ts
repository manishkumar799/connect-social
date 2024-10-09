import {Request,Response, NextFunction,Handler} from "express";
function asyncMiddleware(handler:Handler) {
    return async (req:Request, res:Response, next:NextFunction) => {
      try {
        await handler(req, res, next);
      } catch (err) {
        next(err);
      }
    };
  }
  
  module.exports = asyncMiddleware;
  