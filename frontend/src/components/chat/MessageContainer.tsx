import React from 'react';
import moment from 'moment';
import {  useAppSelector } from '../../hooks/useTypedSelector';
interface HeaderProps {
  personalMessages: any;
  showTime: boolean;
  _id: string | null;
  setShowTime: (val: boolean) => void;
}

const MessageContainer: React.FC<HeaderProps> = ({ setShowTime, showTime, _id }) => {
  const { personalMessages } = useAppSelector((state) => state.chat);
  return (
    <div
      //   ref={messageContainerRef}
      className="flex flex-col-reverse gap-2 px-6 w-full py-1 overflow-y-auto scrollbar-hide h-[calc(100vh-65px)]"
      style={{
        marginBottom: "65px",
        overflowY: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {personalMessages?.map((item, index: number) => (
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
  );
};

export default MessageContainer;
