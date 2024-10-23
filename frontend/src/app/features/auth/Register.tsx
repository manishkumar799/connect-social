import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './../../../hooks/useTypedSelector';
import { register } from './authSlice';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

    const handleRegister = () => {
        dispatch(register({ email, password, name }));
    };
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);
    return (
        <div className="relative py-3 sm:max-w-xs sm:mx-auto">
            <div
                className="min-h-96 px-8 py-6 mt-4 text-left bg-white dark:bg-gray-900 rounded-xl shadow-lg"
            >
                <div className="flex flex-col justify-center items-center h-full select-none">
                    <div className="flex flex-col items-center justify-center gap-2 mb-8">
                        <img className="w-8 h-8 bg-gray-700" src="https://avatar.iran.liara.run/public/boy?email=Ash" alt="description" />
                        <p className="m-0 text-[16px] font-semibold dark:text-white">
                            Register to your Account
                        </p>
                        <span className="m-0 text-xs max-w-[90%] text-center text-[#8B8E98]"
                        >Get started with our app, just start section and enjoy experience.
                        </span>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <label className="font-semibold text-xs text-gray-400">Name</label>
                        <input
                            placeholder="John Doe"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 "
                        />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <label className="font-semibold text-xs text-gray-400">Email</label>
                        <input
                            placeholder="email@example.com"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 "
                        />
                    </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label className="font-semibold text-xs text-gray-400">Password</label>
                    <input
                        placeholder="••••••••"
                        className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 "
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button onClick={handleRegister} disabled={loading}
                        className="py-1 px-8 bg-blue-500 hover:bg-blue-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none"
                    >
                        {loading ? 'Logging in...' : 'Register'}
                    </button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
                <div className='mt-2'>
                    <button onClick={()=>{navigate('/login')}} disabled={loading}
                        className="py-1 px-8 bg-blue-500 hover:bg-blue-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none"
                    >
                        Log in
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
