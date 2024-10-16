import React from 'react';
import { useAppDispatch, useAppSelector } from './hooks/useTypedSelector';
import { logout } from './app/features/auth/authSlice';
// import ChatCard from './components/chat/ChatCard';
import { allChats } from './app/features/chat/chatSlice';
import Chat from './app/features/chat/Chat';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  dispatch(allChats())
  return (
    <div className='m-2 p-4 '>
      <div className='flex justify-between border border-b-2  p-3'>

        <h1>Welcome, {user}!</h1>
        <div className=''>
          <input type="text" className='py-1 px-4 border rounded-xl flex items-center justify-center'  placeholder='search'/>
        </div>
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>
      <div className='mt-4 flex justify-start gap-4'>
        <div className='w-[20%]'>
        <Chat />
        </div>
      <div className='border w-[80%] h-[70vh] p-4'>Hi</div>
      </div>
    </div>
  );
};

export default App;
