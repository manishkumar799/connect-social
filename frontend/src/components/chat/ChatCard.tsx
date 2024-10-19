import React from 'react';
import { useAppSelector,useAppDispatch } from '../../hooks/useTypedSelector';
import { personalMessages, setReceipientId } from '../../app/features/chat/chatSlice';

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
    }
    return (
        <div  onClick={handleChatMessage} className="w-full max-w-[290px] h-[70px] bg-[#353535] rounded-[20px] flex items-center justify-start backdrop-blur-[10px] transition-all ease-in-out duration-500 hover:cursor-pointer hover:transform hover:scale-[1.05]">
            <div className="w-[50px] h-[50px] ml-[10px] rounded-[10px] bg-gradient-to-b from-[#d7cfcf] to-[#9198e5] transition-all ease-in-out duration-500 hover:bg-gradient-to-b hover:from-[#9198e5] hover:to-[#712020]"></div>
            <div className="w-[calc(100%-90px)] ml-[10px] text-white font-poppins">
                <div className="flex items-center justify-between">
                    <p className="text-[16px] font-bold">{userName[0].name}</p>
                    <span className="text-[10px]">{chat?.lastInteraction}</span>
                </div>
                <p className="text-[12px] font-light">{chat?.lastMessage?.content}</p>
            </div>
        </div>
    );
}

export default ChatCard;
