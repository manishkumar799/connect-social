import React from 'react';
import { useAppDispatch, useAppSelector } from './hooks/useTypedSelector';
import { logout } from './app/features/auth/authSlice';
import ChatCard from './components/ChatCard';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  

  return (
    <div>
      <h1>Welcome, {user}!</h1>
      <button onClick={() => dispatch(logout())}>Logout</button>
      <ChatCard/>
    </div>
  );
};

export default App;
