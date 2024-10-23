import apiClient from "../../apiClient";

// Define the login credentials and response types
interface LoginCredentials {
  email: string;
  password: string;
}
interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

interface LoginResponse {
  token: string;
  user: string;
}


// Login API call
export const loginApi = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
  return response.data; // Axios automatically handles JSON responses
};
export const registerApi = async (credentials: RegisterCredentials): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/auth/register', credentials);
  return response.data; // Axios automatically handles JSON responses
};
