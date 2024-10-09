import {Request,Response, NextFunction} from "express";
import logger  from '../utils/logger'; // Adjust path as needed

interface IError extends Error {
  statusCode?: number;
}

async function errorHandler(err:IError, req:Request, res:Response, next:NextFunction) {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (statusCode === 500) {
    // Log internal server errors
    logger.error(`Internal Server Error: ${err.message}`, { stack: err.stack });
  } else {
    // Log client errors
    logger.warn(`Client Error: ${err.message}`);
  }

  // Send error response
  res.sendError(err, statusCode);
}

export default errorHandler;
