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
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://hm5dh3p7-5173.inc1.devtunnels.ms",
    ], // Your frontend URL
    credentials: true, // Allow cookies and headers to be sent
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(responseFormatter);

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello!');
});
app.post('/api/auth/register',userController.registerUser);
app.post('/api/auth/login',userController.loginUser);

app.use(tokenValidator)
app.use('/api',routes)
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
