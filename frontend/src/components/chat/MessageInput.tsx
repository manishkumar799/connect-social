import React from 'react';
import { BsEmojiSmile } from "react-icons/bs";
import { TiAttachmentOutline } from "react-icons/ti";

interface HeaderProps {
  message: string;
  setMessage: (value:string) => void;
  handleSendMessage: () => void;
}

const MessageInput: React.FC<HeaderProps> = ({ message, setMessage, handleSendMessage }) => {
  return (
    <div className="absolute h-[63px] w-full flex flex-grow gap-1 justify-center items-center  bottom-0 shadow-xl border-2 border-bold border-t-[#B5C0D0]">
      <div className=" inset-y-0 start-14 flex items-center hover:cursor-pointer">
        <BsEmojiSmile size={20} />
      </div>
      <div className=" inset-y-0 flex items-center ps-3 start-2 top-[10px] w-[60px] h-[40px] hover:cursor-pointer">
        <TiAttachmentOutline size={30} />
      </div>
      <textarea
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
  );
};

export default MessageInput;
