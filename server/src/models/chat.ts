import mongoose, { Schema, Document } from 'mongoose';

// Define the chat schema
const ChatSchema: Schema = new Schema({
    chatType: { type: String, enum: ['personal', 'group'], required: true }, // Type of chat
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // For personal chats, this will be 2 users
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: false }, // Reference to Group if it's a group chat
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message', required: false }, // Optional reference to the last message
    lastInteraction:Date
}, {
    timestamps: true // Automatically add createdAt and updatedAt timestamps
});

// Define the interface for the Chat document
export interface IChat extends Document {
    chatType: 'personal' | 'group';
    members: string[];
    group?: string; // Optional for personal chats
    lastMessage?: string; // Optional for tracking the last message
    lastInteraction:Date;
}

// Register the Chat model with Mongoose
export const Chat = mongoose.model<IChat>('Chat', ChatSchema);
