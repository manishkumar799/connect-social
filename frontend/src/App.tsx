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
    <div>
      <h1>Welcome, {user}!</h1>
      <button onClick={() => dispatch(logout())}>Logout</button>
      <Chat/>
    </div>
  );
};

export default App;
