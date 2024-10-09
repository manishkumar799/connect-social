// src/app.ts

import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import connectDB from './config/db.config';
import dotenv from 'dotenv';
import routes from './routes'
import userController from './user/user.controller';
import tokenValidator from './middleware/tokenValidator';
import responseFormatter from './middleware/responseFormatter';

dotenv.configDotenv()

const app = express();
const PORT = process.env.PORT || 3000;
connectDB()
// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(responseFormatter);

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});
app.post('/api/auth/register',userController.registerUser);
app.post('/api/auth/login',userController.loginUser);

// app.use(tokenValidator)
app.use('/api',routes)
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
