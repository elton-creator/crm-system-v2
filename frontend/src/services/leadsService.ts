import { apiClient } from '@/config/api';

export interface Lead {
  id: string;
  client_id: string;
  funnel_id: string;
  funnel_name?: string;
  name: string;
  email?: string;
  phone?: string;
  origin: string;
  stage: string;
  tags: string[];
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateLeadData {
  funnelId: string;
  name: string;
  email?: string;
  phone?: string;
  origin: string;
  stage: string;
  tags?: string[];
  notes?: string;
}

export interface UpdateLeadData {
  name: string;
  email?: string;
  phone?: string;
  origin: string;
  stage: string;
  tags?: string[];
  notes?: string;
}

export interface LeadHistory {
  id: string;
  lead_id: string;
  from_stage?: string;
  to_stage: string;
  changed_by?: string;
  changed_by_name?: string;
  created_at: string;
}

export const leadsService = {
  async getAll(clientId?: string): Promise<Lead[]> {
    const params = clientId ? `?clientId=${clientId}` : '';
    return apiClient.get<Lead[]>(`/leads${params}`);
  },

  async getById(id: string): Promise<Lead> {
    return apiClient.get<Lead>(`/leads/${id}`);
  },

  async create(data: CreateLeadData): Promise<Lead> {
    return apiClient.post<Lead>('/leads', data);
  },

  async update(id: string, data: UpdateLeadData): Promise<Lead> {
    return apiClient.put<Lead>(`/leads/${id}`, data);
  },

  async delete(id: string): Promise<{ message: string }> {
    return apiClient.delete(`/leads/${id}`);
  },

  async getHistory(id: string): Promise<LeadHistory[]> {
    return apiClient.get<LeadHistory[]>(`/leads/${id}/history`);
  },
};