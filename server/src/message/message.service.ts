import { Message,IMessage } from "../models/message";

const sendMessage = async (
  senderId: string,
  content: string,
  chatType: "personal" | "group",
  chatId: string
): Promise<IMessage> => {
  const message = new Message({
    sender: senderId,
    content,
    chatType,
    chatId,
    timestamp: new Date(),
  });
  
  await message.save();
  return message;
};

const fetchMessages = async (chatId: string): Promise<IMessage[]> => {
  return await Message.find({ chatId }).populate("sender", "name");
};

export default {sendMessage, fetchMessages}