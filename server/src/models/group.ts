import mongoose, { Schema, Document } from 'mongoose';

const GroupSchema = new Schema({
    name: String,
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  });
  
  export interface IGroup extends Document {
    name: string;
    members: string[];
    admin: string;
  }
  
  export const Group = mongoose.model<IGroup>('Group', GroupSchema);