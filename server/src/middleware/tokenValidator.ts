import jwt from "jsonwebtoken";
import {Request,Response, NextFunction} from "express";

function tokenValidator(req:Request, res:Response, next:NextFunction) {
  const token = req.cookies.token;
  if (!token) {
    const error:any = new Error();
    error.message = "Access denied. No token provided.";
    error.statusCode = 401;
    throw error;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded; // Attach decoded token to request object
    next(); // Proceed to the next middleware or route handler
  } catch (err:any) {
    err.statusCode = 401;
    throw err;
  }
}

export default tokenValidator;
