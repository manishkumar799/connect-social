import { Request, Response, NextFunction } from "express";
import  messageService from "./message.service";

const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content, chatType, chatId } = req.body;
    const senderId = req.user.id;
    
    const message = await messageService.sendMessage(senderId, content, chatType, chatId);
    res.status(201).json(message);
  } catch (err) {
    next(err);
  }
};

const fetchMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { chatId } = req.params;
    const messages = await messageService.fetchMessages(chatId);
    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
};

export default {sendMessage, fetchMessages}
