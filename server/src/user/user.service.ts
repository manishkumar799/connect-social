import {User, IUser } from "./../models/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const registerUser = async (name: string, email: string, password: string): Promise<IUser | null> => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });
  
  await newUser.save();
  return newUser;
};

const loginUser = async (email: string, password: string): Promise<Object | null> => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
  return {token, user:user.name};
};

const getUserProfile = async (userId: string): Promise<IUser | null> => {
  return await User.findById(userId).select("-password").populate("groups");
};
const getAllUsers = async () => {
  return await User.find().select("-password");
};

export default {registerUser, loginUser, getUserProfile,getAllUsers}