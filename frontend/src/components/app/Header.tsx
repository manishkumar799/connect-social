import React from 'react';

interface HeaderProps {
  user: string|null;
  handleLogout: () => void;
  onRefresh: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, handleLogout, onRefresh }) => {
  return (
    <div className='flex justify-between border-b-2 p-3 h-[60px]'>
      <h1>Welcome, {user}!</h1>
      <div className='flex gap-2'>
        <button
          onClick={onRefresh}
          className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-purple-600 text-white font-bold py-1 px-2 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce"
        >
          Refresh
        </button>
        <button
          onClick={handleLogout}
          className="flex h-fit w-fit items-center justify-center gap-[0.5em] rounded-full bg-[#c60808] px-2 py-1 text-white shadow-[inset_0px_-4px_4px_0px_#f05b5b,0px_0px_0px_2px_#f9d1d1,0px_4px_0px_0px_#A60000] duration-[250ms] hover:translate-y-[0.25em] active:translate-y-[0.5em] active:shadow-[inset_0px_-4px_4px_0px_#f05b5b,0px_0px_0px_2px_#f9d1d1]"
        >
          <p className="[text-shadow:0px_1px_1px_0px_#950000]">Logout</p>
        </button>
      </div>
    </div>
  );
};

export default Header;
