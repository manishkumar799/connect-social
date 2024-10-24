import React from 'react';
import { SlOptions } from "react-icons/sl";
import { setHidden } from '../../app/features/chat/chatSlice';
import { useAppDispatch } from '../../hooks/useTypedSelector';
import { MdCall, MdVideoCall } from "react-icons/md";
import { FaArrowAltCircleLeft } from "react-icons/fa";
interface HeaderProps {
  chatName: string;
}

const ChatHeader: React.FC<HeaderProps> = ({ chatName }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="py-2 px-4 flex justify-between items-center h-[70px] bg-white border w-full">
      <div className=" flex gap-2">
        <div className='sm:hidden'>
          <div onClick={() => dispatch(setHidden(false))} className="flex justify-center items-center h-full">
            <FaArrowAltCircleLeft size={30} />
          </div>
        </div>
        <img
          className="h-[50px] w-[50px] rounded-full border-x-2 hover:cursor-pointer"
          src="https://cdn-icons-png.flaticon.com/512/21/21104.png"
          alt=""
        />
        <div className="">
          <div className="font-bold md:text-lg">{chatName}</div>
          <div className="hidden md:text-[12px]">Last seen 30 minutes ago.</div>
        </div>
      </div>
      <div className='hidden md:flex gap-7 items-center'>
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
      <div className='md:hidden flex gap-7 items-center'>
        <div className="hover:cursor-pointer">
          <MdCall size={30} />
        </div>
        <div className="hover:cursor-pointer">
          <SlOptions size={30} />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
