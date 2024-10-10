import axios from 'axios';

  
  interface AllChatResponse {
    count: number;
    interactedUsers: string[];
    chats:chatsList[]
  }

  interface chatsList{
    _id:string;
    chatType:string;
    members:membersList[];
    lastInteraction:lastInteraction;
    lastMessage:string;
  }

  interface lastInteraction{
    _id:string;
    sender:sender;
    content:string;
  }

  interface membersList{
    _id:string;
    name:string;
    email:string;
  };
  interface sender{
    _id:string;
    name:string;
  }
  
  // Create an Axios instance for reuse
  const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api', // Change this to your actual API base URL
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
//   apiClient.defaults.withCredentials = true 
  
  // Login API call
  export const getAllChatsApi = async (): Promise<AllChatResponse> => {
    const response = await apiClient.get<AllChatResponse>('/chat/chats');
    return response.data; // Axios automatically handles JSON responses
  };
  