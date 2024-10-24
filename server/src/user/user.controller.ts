import { Request, Response, NextFunction } from "express";
import userService from "./user.service";
/**
 * Controller to handle searching a user by name or email
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {Promise<Response>} - The response with the found user or error message
 */

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await userService.registerUser(name, email, password);
    res.cookie("token", newUser.token, {
      httpOnly: true,
      secure: true, // Set to true in production with HTTPS
      sameSite: "none", // Required for cross-origin requests ""strict""
      maxAge: 3600000 * 24 * 7, // 1 hour in milliseconds
      path: "/",
  });
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
export const getUserBySearch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search } = req.query as { search?: string };
    if (!search) {
      return res.status(400).json({ message: 'Please provide a search query.' });
    }
    const user = await userService.findUserBySearch(search,req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error)
  }
};


export default {registerUser, loginUser, getUserProfile,getAllUsers ,getUserBySearch}