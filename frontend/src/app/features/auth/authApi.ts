import axios from 'axios';

// Define the login credentials and response types
interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: string;
}

// Create an Axios instance for reuse
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Change this to your actual API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});
apiClient.defaults.withCredentials = true 

// Login API call
export const loginApi = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
  return response.data; // Axios automatically handles JSON responses
};
