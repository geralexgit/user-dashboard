import axios from 'axios';
import { UsersResponse, User } from './types';

const API_BASE_URL = 'https://dummyjson.com';

export const userApi = {
  getAllUsers: async (limit: number = 30, skip: number = 0): Promise<UsersResponse> => {
    const response = await axios.get<UsersResponse>(
      `${API_BASE_URL}/users?limit=${limit}&skip=${skip}`
    );
    return response.data;
  },

  searchUsers: async (query: string): Promise<UsersResponse> => {
    const response = await axios.get<UsersResponse>(
      `${API_BASE_URL}/users/search?q=${query}`
    );
    return response.data;
  },

  getUserById: async (id: number): Promise<User> => {
    const response = await axios.get<User>(`${API_BASE_URL}/users/${id}`);
    return response.data;
  },
};
