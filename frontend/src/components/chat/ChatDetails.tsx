import React, { useState } from 'react';
import { sendPersonalMessage } from '../../app/features/chat/chatSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import Loader from '../Loader';
import ChatHeader from './ChatHeader';
import MessageContainer from './MessageContainer';
import MessageInput from './MessageInput';

const ChatDetails: React.FC = () => {

  const [showTime, setShowTime] = useState(false);
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("")
  const { _id } = useAppSelector((state) => state.profile);
  const { loading, chatName, personalMessages, recipientId } = useAppSelector((state) => state.chat);


  const handleSendMessage = () => {
    if (!message.trim()) {
      return
    }
    dispatch(sendPersonalMessage({ recipientId: recipientId, content: message }))
    setMessage("")

  }
  if (!chatName) {
    return (
      <div className="h-full flex justify-center items-center flex-grow">
        Please select chat to start conversation...
      </div>
    )
  }
  if (loading) {
    return <Loader />;  // Show loader during the API call
  }

  return (
    <div className="flex flex-col flex-grow overflow-auto shadow-xl h-full border gap-0">
      {/* Header */}
      <ChatHeader chatName={chatName} />
      {/* Message Container */}
      <MessageContainer personalMessages={personalMessages} showTime={showTime} setShowTime={setShowTime} _id={_id} />
      {/* Message Input */}
      <MessageInput message={message} setMessage={setMessage} handleSendMessage={handleSendMessage} />
    </div>
  )
}

export default ChatDetails;