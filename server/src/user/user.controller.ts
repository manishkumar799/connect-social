import { Request, Response, NextFunction } from "express";
import userService from "./user.service";


const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await userService.registerUser(name, email, password);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);
    res.cookie("token", user.token, {
        httpOnly: true,
        secure: true, // Set to true in production with HTTPS
        sameSite: "none", // Required for cross-origin requests ""strict""
        maxAge: 3600000 * 24 * 7, // 1 hour in milliseconds
        path: "/",
    });
    res.status(200).json({ ...user });
  } catch (err) {
    next(err);
  }
};

const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.getUserProfile(req.user.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
    } catch (err) {
      next(err);
  }
};
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.getAllUsers();
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
    } catch (err) {
      next(err);
  }
};



export default {registerUser, loginUser, getUserProfile,getAllUsers}