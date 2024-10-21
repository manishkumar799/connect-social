import React from 'react';
import { useAppSelector,useAppDispatch } from '../../hooks/useTypedSelector';
import { personalMessages, setReceipientId ,setChatName} from '../../app/features/chat/chatSlice';

interface ChatProp {
    chat: {
        lastInteraction: string;
        lastMessage: {
            content: string
        };
        members:membersList[]
    }
}
interface membersList{
    _id:string;
    name:string;
    email:string;
};

const ChatCard: React.FC<ChatProp> = ({ chat }) => {
    const dispatch = useAppDispatch();
    const { _id } = useAppSelector((state) => state.profile);
    const userName:any = chat.members.filter((member)=>member._id!=_id)

    const handleChatMessage = ()=>{
        dispatch(personalMessages(userName[0]._id))
        dispatch(setReceipientId(userName[0]._id))
        dispatch(setChatName(userName[0].name))

    }
    return (
        // <div  onClick={handleChatMessage} className="w-full max-w-[290px] h-[70px] bg-[#353535] rounded-[20px] flex items-center justify-start backdrop-blur-[10px] transition-all ease-in-out duration-500 hover:cursor-pointer hover:transform hover:scale-[1.05]">
        //     <div className="w-[50px] h-[50px] ml-[10px] rounded-[10px] bg-gradient-to-b from-[#d7cfcf] to-[#9198e5] transition-all ease-in-out duration-500 hover:bg-gradient-to-b hover:from-[#9198e5] hover:to-[#712020]"></div>
        //     <div className="w-[calc(100%-90px)] ml-[10px] text-white font-poppins">
        //         <div className="flex items-center justify-between">
        //             <p className="text-[16px] font-bold">{userName[0].name}</p>
        //             <span className="text-[10px]">{chat?.lastInteraction}</span>
        //         </div>
        //         <p className="text-[12px] font-light">{chat?.lastMessage?.content}</p>
        //     </div>
        // </div>
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
                <div className="text-[12px] ">{chat?.lastInteraction}</div>
                <div className="text-[15px] rounded-full w-5 h-5 flex justify-center items-center border-2 border-black">
                  {1}
                </div>
              </div>
            </div>
          </div>
    );
}

export default ChatCard;
