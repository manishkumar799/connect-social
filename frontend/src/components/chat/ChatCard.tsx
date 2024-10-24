import React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/useTypedSelector';
import { personalMessages, setReceipientId, setChatName, setHidden } from '../../app/features/chat/chatSlice';
import moment from 'moment';

interface ChatProp {
  chat: {
    lastInteraction: string;
    lastMessage: {
      content: string
    };
    members: membersList[]
  }
}
interface membersList {
  _id: string;
  name: string;
  email: string;
};

const ChatCard: React.FC<ChatProp> = ({ chat }) => {
  const dispatch = useAppDispatch();
  const { _id } = useAppSelector((state) => state.profile);
  const userName: any = chat.members.filter((member) => member._id != _id)

  const handleChatMessage = () => {
    dispatch(personalMessages(userName[0]._id))
    dispatch(setReceipientId(userName[0]._id))
    dispatch(setChatName(userName[0].name))
    dispatch(setHidden(true));
  }
  return (
    <div
      onClick={handleChatMessage}
      className="h-[60px] px-2 flex flex-row items-center relative gap-2 shadow-md bg-[#efeeee] p-2 custom-shadow border-2 border-slate-300 hover:cursor-pointer my-2"
    >
      <div className="">
        <img
          className="h-[50px] w-[50px] rounded-full border-x-2"
          src="https://cdn-icons-png.flaticon.com/512/21/21104.png"
          alt=""
        />
      </div>
      <div className="flex justify-between ">
        <div className="">
          <div className="font-bold">{userName[0].name}</div>
          <div className="text-[10px] w-[80%] overflow-hidden whitespace-nowrap overflow-ellipsis">
            {chat?.lastMessage?.content.length > 30
              ? chat?.lastMessage?.content.slice(0, 30) + "..."
              : chat?.lastMessage?.content}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 absolute right-1">
          <div className="text-[12px] ">{moment(chat?.lastInteraction).fromNow()}</div>
          <div className="text-[15px] rounded-full w-5 h-5 flex justify-center items-center border-2 border-black">
            {1}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatCard;
