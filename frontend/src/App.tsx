import React, { useEffect } from 'react';
import { logout } from './app/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from './hooks/useTypedSelector';
// import ChatCard from './components/chat/ChatCard';
import { allChats } from './app/features/chat/chatSlice';
import { getProfile } from './app/features/profile/profileSlice';
import Body from './components/app/Body';
import Header from './components/app/Header';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  useEffect(() => {
    dispatch(allChats())
    dispatch(getProfile())
  }, [])

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh(); // Initial setting of vh on component mount

    window.addEventListener('resize', setVh); // Update vh on window resize

    return () => {
      window.removeEventListener('resize', setVh); // Clean up the event listener
    };
  }, []);


  const handleLogout = () => {
    dispatch(logout())
  }
  const onRefresh = () => {
    // dispatch(logout())
  }
  return (
    <div className='p-2 h-[calc(var(--vh,1vh)*100)] flex flex-col overflow-hidden'>
      {/* Header Section */}
      <Header handleLogout={handleLogout} onRefresh={onRefresh} user={user} />

      {/* Body Section */}
      <Body />
    </div>

  );
};

export default App;
