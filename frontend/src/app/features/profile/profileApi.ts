import axios from 'axios';

interface IProfile{
    _id:string;
    name:string;
    email:string;
}

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api', // Change this to your actual API base URL
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  export const getProfileApi = async (): Promise<IProfile> => {
    const response = await apiClient.get<IProfile>('/user/profile');
    return response.data; // Axios automatically handles JSON responses
  };
  