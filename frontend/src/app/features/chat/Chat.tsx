import React from 'react';
import ChatCard from '../../../components/chat/ChatCard';
import { useAppSelector } from '../../../hooks/useTypedSelector';
interface chatsList {
  _id: string;
  chatType: string;
  members: membersList[];
  lastInteraction: string;
  lastMessage: lastMessage;
}

interface lastMessage {
  _id: string;
  sender: sender;
  content: string;
}

interface membersList {
  _id: string;
  name: string;
  email: string;
};
interface sender {
  _id: string;
  name: string;
}
const Chat: React.FC = () => {
  const chatLists = useAppSelector((state) => state.chat.chats);

  return (
    <div>
      {chatLists.map((chat: chatsList) => (
        <ChatCard key={chat._id} chat={chat}/>
      ))}
    </div>
  );
};

export default Chat;
