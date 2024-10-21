import React from 'react';
import { useAppDispatch, useAppSelector } from './hooks/useTypedSelector';
import { logout } from './app/features/auth/authSlice';
// import ChatCard from './components/chat/ChatCard';
import { allChats } from './app/features/chat/chatSlice';
import Chat from './app/features/chat/Chat';
import ChatDetails from './components/chat/ChatDetails';
import { getProfile } from './app/features/profile/profileSlice';
import { CiCirclePlus } from "react-icons/ci";
import Menu from './components/Menu';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  dispatch(allChats())
  dispatch(getProfile())
  return (
    <div className='m-2 px-2'>
      <div className='flex justify-between border border-b-2 p-3'>

        <h1>Welcome, {user}!</h1>
        <div className='flex gap-2'>

          <button className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-purple-600 text-white font-bold py-1 px-2 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce">
            Refresh
          </button>
          <button onClick={() => dispatch(logout())}
            className="flex h-fit w-fit items-center justify-center gap-[0.5em] rounded-full bg-[#c60808] px-2 py-1 text-white shadow-[inset_0px_-4px_4px_0px_#f05b5b,0px_0px_0px_2px_#f9d1d1,0px_4px_0px_0px_#A60000] duration-[250ms] hover:translate-y-[0.25em] active:translate-y-[0.5em] active:shadow-[inset_0px_-4px_4px_0px_#f05b5b,0px_0px_0px_2px_#f9d1d1]"
          >
            <p className="[text-shadow:0px_1px_1px_0px_#950000]">Logout</p>
          </button>
        </div>

      </div>
      <div className='mt-3 flex justify-start gap-1 relative'>
        <div className='w-[20%] border p-2'>
          <Menu />
          <div className="flex justify-between items-center h-[10%] py-5">
            <div className="text-3xl font-bold">Chats</div>
            <div className="hover:cursor-pointer">
              <CiCirclePlus size={30} />
            </div>
          </div>
          <div className="flex gap-4 text-sm flext-start font-bold">
            <div className="hover:cursor-pointer">DIRECTS</div>
            <div className="hover:cursor-pointer">GROUPS</div>
            <div className="hover:cursor-pointer">PUBLIC</div>
          </div>
          <div className="py-4 relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  // stroke-linecap="round"
                  // stroke-linejoin="round"
                  // stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type=""
              id="default-search"
              className="block w-full h-8 ps-10 text-sm text-gray-900 border border-gray-400 rounded-lg bg-gray-50 shadow-xl"
              placeholder="Search friends, groups..."
              required
            />
            {/* <input className="w-full" type="text" placeholder="search" /> */}
          </div>
          <Chat />
        </div>
        <div className='w-[80%] relative'><ChatDetails /></div>
      </div>
    </div>
  );
};

export default App;
