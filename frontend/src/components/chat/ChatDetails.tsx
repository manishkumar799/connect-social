import React, { useEffect } from 'react'
import { useAppSelector } from '../../hooks/useTypedSelector';


const ChatDetails: React.FC = () => {
    const { personalMessages} = useAppSelector((state) => state.chat);
    useEffect(() => {
    }, [personalMessages])
    return (
        <div className='flex flex-col justify-end'>
            <div>
            {personalMessages?.map((messages) => {
            return <div className='flex flex-row'>
                    {
                        messages.content + " by " + messages.sender.name 
                    }
                </div>
            })}
            </div>
            <div className=''>
                <input className=' border-2 border-black' type="text" />
                <button className='bg-gray-500'>Send</button>
            </div>
        </div>
    )
}

export default ChatDetails;