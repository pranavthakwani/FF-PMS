import axios from 'axios';
import { User, Feedback } from '../types';

const API_BASE_URL = "https://feedback-flow-backend-production.up.railway.app";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const auth = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  me: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// User endpoints
export const users = {
  getTeamMembers: async () => {
    const response = await api.get('/users/team-members');
    return response.data;
  },
};

// Feedback endpoints
export const feedback = {
  getAll: async () => {
    const response = await api.get('/feedback');
    return response.data;
  },
  
  create: async (feedbackData: Omit<Feedback, 'id' | 'created_at' | 'updated_at' | 'manager_name' | 'employee_name' | 'acknowledged'>) => {
    const response = await api.post('/feedback', feedbackData);
    return response.data;
  },
  
  update: async (id: string, feedbackData: Partial<Feedback>) => {
    const response = await api.put(`/feedback/${id}`, feedbackData);
    return response.data;
  },
  
  acknowledge: async (id: string) => {
    const response = await api.post(`/feedback/${id}/acknowledge`);
    return response.data;
  },
  
  getStats: async (employeeId?: string) => {
    const url = employeeId ? `/feedback/stats?employee_id=${employeeId}` : '/feedback/stats';
    const response = await api.get(url);
    return response.data;
  },
};

export default api;