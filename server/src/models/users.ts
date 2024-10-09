// models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

// Define the user schema
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
});

// Create and export the user model
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  groups: string[];
}

export const User = mongoose.model<IUser>('User', UserSchema);
