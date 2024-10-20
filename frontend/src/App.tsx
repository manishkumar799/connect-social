import React from 'react';
import { useAppDispatch, useAppSelector } from './hooks/useTypedSelector';
import { logout } from './app/features/auth/authSlice';
// import ChatCard from './components/chat/ChatCard';
import { allChats } from './app/features/chat/chatSlice';
import Chat from './app/features/chat/Chat';
import ChatDetails from './components/chat/ChatDetails';
import { getProfile } from './app/features/profile/profileSlice';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  dispatch(allChats())
  dispatch(getProfile())
  return (
    <div className='m-2 p-4 '>
      <div className='flex justify-between border border-b-2  p-3'>

        <h1>Welcome, {user}!</h1>
        <div className=''>
          <input type="text" className='py-1 px-4 border rounded-xl flex items-center justify-center' placeholder='search' />
        </div>
        <button className='bg-blue-300'>Refresh</button>
        <button className='bg-red-400' onClick={() => dispatch(logout())}>Logout</button>
      </div>
      <div className='mt-4 flex justify-start gap-4 '>
        <div className='w-[20%]'>
          <Chat />
        </div>
        <div className='w-[80%]  p-4'><ChatDetails /></div>
      </div>
    </div>
  );
};

export default App;
