import React from 'react';

interface ChatMenuProps {
  handleSearchUser: (searchTerm: string) => void;
  users: any[];
  search: string;
  loading: boolean;
  error: string | null;
  handleNewChat: (user: any) => void;
}

const ChatMenu: React.FC<ChatMenuProps> = ({ handleSearchUser, users, search, loading, error, handleNewChat }) => {
  return (
    <div className="w-[400px] border p-2 md:flex flex-col overflow-auto">
      <div className="flex justify-between items-center h-[10%] py-5">
        <div className="text-3xl font-bold">Chats</div>
        <button title="Add New" className="group cursor-pointer outline-none hover:rotate-90 duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" className="stroke-slate-400 fill-none group-hover:fill-slate-800 group-active:stroke-slate-200 group-active:fill-slate-600 group-active:duration-0 duration-300">
            <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke-width="1.5"></path>
            <path d="M8 12H16" stroke-width="1.5"></path>
            <path d="M12 16V8" stroke-width="1.5"></path>
          </svg>
        </button>
      </div>

      <div className="flex gap-4 text-sm flex-start font-bold">
        <div className="hover:cursor-pointer">DIRECTS</div>
        <div className="hover:cursor-pointer">GROUPS</div>
        <div className="hover:cursor-pointer">PUBLIC</div>
      </div>

      <div className="py-4 relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input
          type="text"
          onChange={(e) => { handleSearchUser(e.target.value) }}
          id="default-search"
          className="block w-full h-8 ps-10 text-sm text-gray-900 border border-gray-400 rounded-lg bg-gray-50 shadow-xl"
          placeholder="Search friends, groups..."
          required
        />
        {search.trim() && (
          <div className="absolute top-8 w-full left-0 mt-4 z-10 bg-white shadow-lg p-4 rounded">
            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <ul>
              {users.map(user => (
                <li key={user._id} onClick={() => { handleNewChat(user) }} className="py-1 border-b">{user.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMenu;
