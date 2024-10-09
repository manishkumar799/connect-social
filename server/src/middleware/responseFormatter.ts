import {Request,Response, NextFunction} from "express";

function responseFormatter(req:Request, res:Response, next:NextFunction) {
  // Response formatter for success responses


  res.sendResponse = (data:any, message = 'Success', statusCode = 200) => {
    res.status(statusCode).json({
      status: 'success',
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  };

  // Response formatter for error responses
  res.sendError = (error:Error, statusCode = 500) => {
    res.status(statusCode).json({
      status: 'error',
      message: error.message,
      error: {
        name: error.name,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      timestamp: new Date().toISOString(),
    });
  };

  next();
}
export default responseFormatter;
