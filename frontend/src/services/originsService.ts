import { apiClient } from '@/config/api';

export interface Origin {
  id: string;
  client_id: string;
  name: string;
  color: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateOriginData {
  name: string;
  color: string;
}

export interface UpdateOriginData {
  name: string;
  color: string;
}

export const originsService = {
  async getAll(): Promise<Origin[]> {
    return apiClient.get<Origin[]>('/origins');
  },

  async create(data: CreateOriginData): Promise<Origin> {
    return apiClient.post<Origin>('/origins', data);
  },

  async update(id: string, data: UpdateOriginData): Promise<Origin> {
    return apiClient.put<Origin>(`/origins/${id}`, data);
  },

  async delete(id: string): Promise<{ message: string }> {
    return apiClient.delete(`/origins/${id}`);
  },
};