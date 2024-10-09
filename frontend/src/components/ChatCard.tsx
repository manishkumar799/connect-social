import React from 'react';

const ChatCard: React.FC = () => {
    return (
        <div className="w-full max-w-[290px] h-[70px] bg-[#353535] rounded-[20px] flex items-center justify-start backdrop-blur-[10px] transition-all ease-in-out duration-500 hover:cursor-pointer hover:transform hover:scale-[1.05]">
            <div className="w-[50px] h-[50px] ml-[10px] rounded-[10px] bg-gradient-to-b from-[#d7cfcf] to-[#9198e5] transition-all ease-in-out duration-500 hover:bg-gradient-to-b hover:from-[#9198e5] hover:to-[#712020]"></div>
            <div className="w-[calc(100%-90px)] ml-[10px] text-white font-poppins">
                <div className="flex items-center justify-between">
                    <p className="text-[16px] font-bold">Clans of Clash</p>
                    <span className="text-[10px]">12 min ago</span>
                </div>
                <p className="text-[12px] font-light">Xhattmahs is not attacking your base!</p>
            </div>
        </div>
    );
}

export default ChatCard;
