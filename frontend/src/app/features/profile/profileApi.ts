import apiClient from '../../apiClient';

interface IProfile{
    _id:string;
    name:string;
    email:string;
}


  export const getProfileApi = async (): Promise<IProfile> => {
    const response = await apiClient.get<IProfile>('/user/profile');
    return response.data; // Axios automatically handles JSON responses
  };
  