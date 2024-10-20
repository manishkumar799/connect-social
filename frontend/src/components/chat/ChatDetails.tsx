import React, { useEffect, useState ,useRef} from 'react'
import { useAppSelector,useAppDispatch } from '../../hooks/useTypedSelector';
import { sendPersonalMessage } from '../../app/features/chat/chatSlice';
import { BsEmojiSmile, BsSendFill } from "react-icons/bs";
import { TiAttachmentOutline } from "react-icons/ti";


const ChatDetails: React.FC = () => {
  const [showTime, setShowTime] = useState(false);
    const textareaRef = useRef(null);
    const dispatch = useAppDispatch();
    const [message,setMessage]=useState("")
    const { personalMessages,recipientId} = useAppSelector((state) => state.chat);
    const { _id} = useAppSelector((state) => state.profile);
    useEffect(() => {
        console.log(personalMessages)
    }, [personalMessages])
    const handleSendMessage =()=>{
        if(!message.trim()){
            return
        }
        dispatch(sendPersonalMessage({ recipientId: recipientId, content: message }));
        setMessage("")

    }
    return (
        // <div className='flex flex-col justify-end'>
        //     <div>
        //     {personalMessages?.map((messages) => {
        //     return <div className='flex flex-row'>
        //             {
        //                 messages.content + " by " + messages.sender?.name +" at " + messages.timestamp
        //             }
        //         </div>
        //     })}
        //     </div>
        //     <div className=''>
        //         <input value={message} onChange={(e:any)=>setMessage(e.target.value)} className=' border-2 border-black' type="text" />
        //         <button onClick={handleSendMessage} className='bg-gray-500'>Send</button>
        //     </div>
        // </div>
        <div className="flex flex-col shadow-xl">
        {/* Header */}
        {/* <div className="px-4 flex items-center h-[63px] bg-white">
          <div className="w-[10%]">
            <img
              className="h-[50px] w-[50px] rounded-full border-x-2 hover:cursor-pointer"
              src="https://cdn-icons-png.flaticon.com/512/21/21104.png"
              alt=""
            />
          </div>
          <div className="w-[70%]">
            <div className="font-bold text-lg">{inboxData?.name}</div>
            <div className="text-[12px]">Last seen 30 minutes ago.</div>
          </div>
          <div className="flex gap-7">
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
        </div> */}
        {/* Message Container */}
        <div
        //   ref={messageContainerRef}
          className="bottom-20 end-0 flex flex-col gap-2 px-6 w-full items-end py-1"
          style={{
            maxHeight: "70vh",
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {personalMessages?.map((item, index) => (
            <div
              key={index}
              onClick={() => setShowTime(!showTime)}
              className={`${
                item.sender._id != _id
                  ? "bg-slate-500 self-start"
                  : "bg-black self-end"
              } text-white px-5 py-2 rounded-lg inline-block min-w-[50px] max-w-[80%] `}
            >
              {item.content}
              <span
                className={`text-[10px]  justify-end ${
                  showTime ? "flex" : "hidden"
                }`}
              >
                {item.timestamp}
              </span>
            </div>
          ))}
        </div>
        {/* Message Input */}
        <div className="h-[63px] w-full flex justify-center items-center  bottom-3 shadow-xl border-2 border-bold border-t-[#B5C0D0]">
          <div className=" inset-y-0 start-14 flex items-center hover:cursor-pointer">
            <BsEmojiSmile size={20} />
          </div>
          <div className=" inset-y-0  flex items-center ps-3 start-2 top-[10px] w-[60px] h-[40px] hover:cursor-pointer">
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
          <div
            className="end-6 w-[60px] h-[40px] flex items-center justify-center shadow-xl rounded-xl bg-blue-700 hover:cursor-pointer"
            onClick={handleSendMessage}
          >
            <BsSendFill color="white" size={25} />
          </div>
        </div>
      </div>
    )
}

export default ChatDetails;