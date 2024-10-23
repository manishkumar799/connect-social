import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/useTypedSelector';
import { logout } from './app/features/auth/authSlice';
// import ChatCard from './components/chat/ChatCard';
import { allChats, initiateChat, setChatName, setReceipientId } from './app/features/chat/chatSlice';
import Chat from './app/features/chat/Chat';
import ChatDetails from './components/chat/ChatDetails';
import { getProfile } from './app/features/profile/profileSlice';
import Menu from './components/Menu';
import { searchUserApi } from './services/api'

interface IUser {
  _id: string;
  name: string;
  email: string;
}
const App: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const hidden = useAppSelector((state) => state.chat.hidden);
  useEffect(() => {
    dispatch(allChats())
    dispatch(getProfile())
  }, [])

  const handleSearchUser = (query: string) => {
    setSearch(query);
  }
  const handleNewChat=(user:any)=>{
    dispatch(setChatName(user.name))
    dispatch(setReceipientId(user._id))
    dispatch(initiateChat(user._id))
  }
  
  useEffect(() => {
    const fetchUsers = async () => {
      if (search.trim() === '') {
        setUsers([]); // Reset users if search is empty
        return;
      }

      setLoading(true);
      setError(null); // Reset error state

      try {
        const response = await searchUserApi(search)
        setUsers(response);
      } catch (err) {
        setError('Error fetching users. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    const debounceFetch = setTimeout(fetchUsers, 300); // Debounce the search

    return () => clearTimeout(debounceFetch); // Cleanup timeout on unmount
  }, [search]);
  return (
    <div className='p-2 h-[100vh] flex flex-col overflow-hidden'>
      {/* Header Section */}
      <div className='flex justify-between border-b-2 p-3 h-[60px]'>
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

      {/* Body Section */}
      <div className='mt-3 flex flex-grow h-full relative overflow-hidden gap-2'>
        <div className={`${hidden && "hidden"} w-[400px] border p-2 md:flex flex-col overflow-auto`}>
          <Menu />

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
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="text" onChange={(e) => { handleSearchUser(e.target.value) }} id="default-search" className="block w-full h-8 ps-10 text-sm text-gray-900 border border-gray-400 rounded-lg bg-gray-50 shadow-xl" placeholder="Search friends, groups..." required />
            {search.trim() && (
              <div className="absolute top-8 w-full left-0 mt-4 z-10 bg-white shadow-lg p-4 rounded">
                {loading && <p className="text-gray-500">Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                <ul>
                  {users.map(user => (
                    <li key={user._id} onClick={()=>{handleNewChat(user)}} className="py-1 border-b">{user.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Chat />
        </div>

        <div className={`w-full ${!hidden && "hidden"} md:flex relative flex-grow overflow-auto`}>
          <ChatDetails />
        </div>
      </div>
    </div>

  );
};

export default App;
