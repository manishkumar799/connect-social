import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/useTypedSelector';
import { sendPersonalMessage } from '../../app/features/chat/chatSlice';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageContainer from './MessageContainer';
import Loader from '../Loader';

const ChatDetails: React.FC = () => {

  const [showTime, setShowTime] = useState(false);
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("")
  const { personalMessages, recipientId } = useAppSelector((state) => state.chat);
  const { chatName } = useAppSelector((state) => state.chat);
  const { _id } = useAppSelector((state) => state.profile);
  const { loading } = useAppSelector((state) => state.chat);
  useEffect(() => {
    console.log(personalMessages)
  }, [personalMessages])
  const handleSendMessage = () => {
    if (!message.trim()) {
      return
    }
    dispatch(sendPersonalMessage({ recipientId: recipientId, content: message }));
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