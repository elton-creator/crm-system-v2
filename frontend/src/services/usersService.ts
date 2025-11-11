import { apiClient } from '@/config/api';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  status: string;
  created_at: string;
}

export interface CreateUserData {
  email: string;
  password: string;
  name: string;
  role: string;
}

export interface UpdateUserStatusData {
  status: string;
}

export const usersService = {
  async getAll(): Promise<User[]> {
    return apiClient.get<User[]>('/users');
  },

  async create(data: CreateUserData): Promise<User> {
    return apiClient.post<User>('/users', data);
  },

  async updateStatus(id: string, data: UpdateUserStatusData): Promise<User> {
    return apiClient.patch<User>(`/users/${id}/status`, data);
  },

  async delete(id: string): Promise<{ message: string }> {
    return apiClient.delete(`/users/${id}`);
  },
};