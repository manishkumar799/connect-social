import React from 'react'
import { BsChatRightFill } from "react-icons/bs";
import { IoCall } from "react-icons/io5";
import { MdMail, MdGroups2 } from "react-icons/md";
const Menu: React.FC = () => {
    return (
        <div className="flex justify-evenly items-center h-[63px] gap-2 bg-white px-4 shadow-xl border">
            <div className=" w-[15%] hover:cursor-pointer ">
                <BsChatRightFill color="blue" size={20} />
            </div>
            <div className="w-[15%] hover:cursor-pointer">
                <IoCall color="#909090" size={25} />
            </div>
            <div className="w-[15%] hover:cursor-pointer">
                <MdMail color="#909090" size={25} />
            </div>
            <div className="w-[15%] hover:cursor-pointer">
                <MdGroups2 color="#909090" size={30} />
            </div>
            <div className="w-[15%] hover:cursor-pointer">
                <img
                    className="h-[35px] w-[35px] rounded-full border-x-2"
                    src="https://cdn-icons-png.flaticon.com/512/21/21104.png"
                    alt=""
                />
            </div>
        </div>
    )
}

export default Menu