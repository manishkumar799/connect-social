import axios from 'axios';

const apiClient = axios.create({
    // baseURL: 'http://localhost:5000/api', // Change this to your actual API base URL
    baseURL: 'https://734a-103-75-161-27.ngrok-free.app/api', // Change this to your actual API base URL
    headers: {
      'Content-Type': 'application/json',
    },
  });
  apiClient.defaults.withCredentials = true 
  apiClient.defaults.headers.common['ngrok-skip-browser-warning'] = "69420" 

export default apiClient;