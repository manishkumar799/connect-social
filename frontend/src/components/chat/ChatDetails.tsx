import React, { useEffect, useState, useRef } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/useTypedSelector';
import { sendPersonalMessage, setHidden } from '../../app/features/chat/chatSlice';
import { BsEmojiSmile } from "react-icons/bs";
import { MdCall, MdVideoCall } from "react-icons/md";
import { TiAttachmentOutline } from "react-icons/ti";
import { SlOptions } from "react-icons/sl";
import moment from 'moment';


const ChatDetails: React.FC = () => {
  const [showTime, setShowTime] = useState(false);
  const textareaRef = useRef(null);
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("")
  const { personalMessages, recipientId } = useAppSelector((state) => state.chat);
  const { chatName } = useAppSelector((state) => state.chat);
  const { _id } = useAppSelector((state) => state.profile);
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
  return (
    <div className="flex flex-col flex-grow shadow-xl h-full border gap-0">
      {/* Header */}
      <div className="px-4 flex justify-between items-center h-[70px] bg-white border w-full">
        <div className=" flex gap-2">
          <div className='sm:hidden'>
            <div onClick={()=>dispatch(setHidden(false))} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-l">
              Prev
            </div>
          </div>
          <img
            className="h-[50px] w-[50px] rounded-full border-x-2 hover:cursor-pointer"
            src="https://cdn-icons-png.flaticon.com/512/21/21104.png"
            alt=""
          />
          <div className="">
            <div className="font-bold text-lg">{chatName}</div>
            <div className="text-[12px]">Last seen 30 minutes ago.</div>
          </div>
        </div>
        <div className='flex gap-7 items-center'>
          <div className="hover:cursor-pointer">
            <MdCall size={30} />
          </div>
          <div className="hover:cursor-pointer">
            <MdVideoCall size={30} />
          </div>
          <div className="hover:cursor-pointer">
            <SlOptions size={30} />
          </div>
        </div>
      </div>
      {/* Message Container */}
      <div
        //   ref={messageContainerRef}
        className="flex flex-col gap-2 px-6 w-full justify-end items-end py-1"
        style={{
          // maxHeight: "auto",
          marginBottom: "65px",
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {personalMessages?.map((item, index) => (
          <div
            key={index}
            onClick={() => setShowTime(!showTime)}
            className={`${item.sender._id != _id
              ? "bg-slate-500 self-start"
              : "bg-black self-end"
              } text-white px-5 py-2 rounded-lg inline-block min-w-[50px] max-w-[80%] `}
          >
            {item.content}
            <span
              className={`text-[10px]  justify-end ${showTime ? "flex" : "hidden"
                }`}
            >
              {moment(item.timestamp).fromNow()}
            </span>
          </div>
        ))}
      </div>
      {/* Message Input */}
      <div className="absolute h-[63px] w-full flex flex-grow gap-1 justify-center items-center  bottom-0 shadow-xl border-2 border-bold border-t-[#B5C0D0]">
        <div className=" inset-y-0 start-14 flex items-center hover:cursor-pointer">
          <BsEmojiSmile size={20} />
        </div>
        <div className=" inset-y-0 flex items-center ps-3 start-2 top-[10px] w-[60px] h-[40px] hover:cursor-pointer">
          <TiAttachmentOutline size={30} />
        </div>
        <textarea
          ref={textareaRef}
          // type="text"
          className="block w-[80%]  p-2 ps-10 pe-10 text-sm text-gray-900 border border-gray-500 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 h-10 max-h-10 min-h-10"
          placeholder="Type a message here..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          required
        />
        <button
          onClick={handleSendMessage}
          className="flex items-center bg-blue-500 text-white gap-1 px-4 py-2 cursor-pointer font-semibold tracking-widest rounded-md hover:bg-blue-400 duration-300 hover:gap-2 phover:translate-x-3"
        >
          Send
          <svg
            className="w-4 h-5"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              stroke-linejoin="round"
              stroke-linecap="round"
            ></path>
          </svg>
        </button>

      </div>
    </div>
  )
}

export default ChatDetails;