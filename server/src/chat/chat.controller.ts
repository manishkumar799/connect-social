// controllers/chatController.ts

import { Request, Response } from "express";
import ChatService from "./chat.service"; // Import the ChatService

// Send a personal message

 const sendPersonalMessage = async (req: Request, res: Response): Promise<void> => {
  const { recipientId, content } = req.body;
  const senderId = req.user.id; // Assuming you attach user info to req.user in auth middleware

  try {
    const message = await ChatService.sendPersonalMessage(senderId, recipientId, content);
    res.status(200).json({ message });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

// Send a group message

 const sendGroupMessage = async (req: Request, res: Response): Promise<void> => {
  const { groupId, content } = req.body;
  const senderId = req.user.id;

  try {
    const message = await ChatService.sendGroupMessage(senderId, groupId, content);
    res.status(200).json({ message });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

// Get all messages from a personal chat

 const getPersonalMessages = async (req: Request, res: Response): Promise<void> => {
  const { recipientId } = req.params;
  const senderId = req.user.id;

  try {
    const messages = await ChatService.getPersonalMessages(senderId, recipientId);
    res.status(200).json(messages);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

// Get all messages from a group chat

 const getGroupMessages = async (req: Request, res: Response): Promise<void> => {
  const { groupId } = req.params;

  try {
    const messages = await ChatService.getGroupMessages(groupId);
    res.status(200).json(messages);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

// Get all chats for a user

 const getUserChats = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user.id;

  try {
    const chats = await ChatService.getUserChats(userId);
    res.status(200).json(chats);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

// Initiate a chat with a new user

 const initiateChat = async (req: Request, res: Response): Promise<void> => {
  const { newUserId } = req.body;
  const currentUserId = req.user.id;

  try {
    const result = await ChatService.initiateChat(currentUserId, newUserId);
    res.status(200).json(result);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export default {sendPersonalMessage, sendGroupMessage, getPersonalMessages,  getGroupMessages,  getUserChats,  initiateChat}