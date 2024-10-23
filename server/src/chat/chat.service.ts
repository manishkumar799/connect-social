import { Chat } from "../models/chat"; // Import your Chat model
import { Message } from "../models/message"; // Import your Message model
import { IUser } from "../models/users"; // Import your User interface

const initiateChat = async (currentUserId: string, newUserId: string) => {
    // Check if a chat already exists
    const chat = await Chat.findOne({
      chatType: 'personal',
      members: { $all: [currentUserId, newUserId] },
    });
  
    if (chat) {
      return await Message.find({ chatId: chat._id }).sort({ timestamp: 1 }).populate("sender","name");
    } else {
      // If no chat exists, create a new one
      const newChat = new Chat({
        chatType: 'personal',
        members: [currentUserId, newUserId],
      });
  
      await newChat.save();
      return [];
    }
  };

  const getUserChats = async (userId: string) => {
    // Find all chats where the user is a member
    // const chats:any = await Chat.find({ members: userId }).populate('members', 'name email').populate("lastMessage","content timestamp sender").populate("sender","name");
    const chats = await Chat.find({ members: userId })
    .populate('members', 'name email')  // Populates the 'members' array with name and email fields
    .populate({
      path: 'lastMessage',
      select: 'content timestamp sender',
      populate: { path: 'sender', select: 'name' },  // Nested populate for 'sender'
    });
  
    // Extract unique user IDs from chats
    const interactedUsers = new Set<string>();
  
    chats.forEach((chat:any) => {
      chat.members.forEach((member:any) => {
        if (member._id !== userId) {
          interactedUsers.add(member._id);
        }
      });
    });
  
    return {
      count: interactedUsers.size,
      interactedUsers: Array.from(interactedUsers),
      chats, // Optionally return chats to see last interactions
    };
  };
  const sendPersonalMessage = async (senderId: string, recipientId: string, content: string) => {
    // Check if a chat exists
    let chat = await Chat.findOne({
      chatType: 'personal',
      members: { $all: [senderId, recipientId] },
    });
  
    // If no chat exists, create one
    if (!chat) {
      chat = new Chat({
        chatType: 'personal',
        members: [senderId, recipientId],
      });
      await chat.save();
    }
  
    // Update last interaction timestamp
    
    // Create the message
    const message = new Message({
        sender: senderId,
        content,
        chatType: 'personal',
        chatId: chat._id,
    });
    
    // Save the message
    await message.save();
    
    chat.lastMessage = message._id as string;
    chat.lastInteraction = new Date();
    await chat.save();

    const populatedMessage = await message.populate('sender', 'name');

    return populatedMessage;
  };
  
  const getPersonalMessages = async (senderId: string, recipientId: string) => {
    const chat = await Chat.findOne({
      chatType: 'personal',
      members: { $all: [senderId, recipientId] },
    });
  
    if (!chat) {
      return [];
    }
    return await Message.find({ chatId: chat._id }).sort({ timestamp: 1 }).populate("sender","name");
  };
  
  const getGroupMessages = async (groupId: string) => {
    return await Message.find({ chatId: groupId }).sort({ timestamp: 1 });
  };
  const sendGroupMessage = async (senderId: string, groupId: string, content: string) => {
    // Step 1: Check if the group chat exists
    const chat = await Chat.findById(groupId);
  
    if (!chat || chat.chatType !== 'group' || !chat.members.includes(senderId)) {
      throw new Error("Invalid group or user not a member of the group.");
    }
  
    // Step 2: Create the message
    const message = new Message({
      sender: senderId,
      content,
      chatType: 'group',
      chatId: chat._id,
    });
  
    // Save the message
    await message.save();
  
    // Step 3: Update lastMessage in chat (optional)
    chat.lastMessage = message._id as string;
    await chat.save();
  
    return message;
  };
        
export default {initiateChat, getUserChats, sendPersonalMessage, getPersonalMessages, getGroupMessages, sendGroupMessage}