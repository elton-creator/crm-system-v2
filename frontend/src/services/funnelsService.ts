import { apiClient } from '@/config/api';

export interface FunnelStage {
  id: string;
  name: string;
  color: string;
}

export interface Funnel {
  id: string;
  client_id: string;
  name: string;
  stages: FunnelStage[];
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateFunnelData {
  name: string;
  stages: FunnelStage[];
}

export interface UpdateFunnelData {
  name: string;
  stages: FunnelStage[];
}

export const funnelsService = {
  async getAll(): Promise<Funnel[]> {
    return apiClient.get<Funnel[]>('/funnels');
  },

  async getById(id: string): Promise<Funnel> {
    return apiClient.get<Funnel>(`/funnels/${id}`);
  },

  async create(data: CreateFunnelData): Promise<Funnel> {
    return apiClient.post<Funnel>('/funnels', data);
  },

  async update(id: string, data: UpdateFunnelData): Promise<Funnel> {
    return apiClient.put<Funnel>(`/funnels/${id}`, data);
  },

  async delete(id: string): Promise<{ message: string }> {
    return apiClient.delete(`/funnels/${id}`);
  },
};