import React, { useEffect, useState } from 'react'
import { useAppSelector,useAppDispatch } from '../../hooks/useTypedSelector';
import { sendPersonalMessage } from '../../app/features/chat/chatSlice';


const ChatDetails: React.FC = () => {
    const dispatch = useAppDispatch();
    const [message,setMessage]=useState("")
    const { personalMessages,recipientId} = useAppSelector((state) => state.chat);
    useEffect(() => {
        personalMessages
    }, [personalMessages])
    const handleSendMessage =()=>{
        if(!message.trim()){
            return
        }
        dispatch(sendPersonalMessage({ recipientId: recipientId, content: message }));
        setMessage("")

    }
    return (
        <div className='flex flex-col justify-end'>
            <div>
            {personalMessages?.map((messages) => {
            return <div className='flex flex-row'>
                    {
                        messages.content + " by " + messages.sender?.name +" at " + messages.timestamp
                    }
                </div>
            })}
            </div>
            <div className=''>
                <input value={message} onChange={(e:any)=>setMessage(e.target.value)} className=' border-2 border-black' type="text" />
                <button onClick={handleSendMessage} className='bg-gray-500'>Send</button>
            </div>
        </div>
    )
}

export default ChatDetails;