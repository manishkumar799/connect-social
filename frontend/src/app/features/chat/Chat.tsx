import React from 'react';
import ChatCard from '../../../components/chat/ChatCard';
import { useAppSelector } from '../../../hooks/useTypedSelector';

const Chat: React.FC = () => {
  const chatLists = useAppSelector((state) => state.chat.chats);

  return (
    <div>
      {chatLists.map((chat) => (
        <ChatCard key={chat._id} chat={chat} />
      ))}
    </div>
  );
};

export default Chat;
