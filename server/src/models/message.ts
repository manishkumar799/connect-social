import mongoose, { Schema, Document } from 'mongoose';

const MessageSchema = new Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    chatType: { type: String, enum: ['personal', 'group'] },
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
    timestamp: Date
  });
  
  export interface IMessage extends Document {
    sender: string;
    content: string;
    chatType: string;
    chatId: string;
    timestamp: Date;
  }
  
  export const Message = mongoose.model<IMessage>('Message', MessageSchema);