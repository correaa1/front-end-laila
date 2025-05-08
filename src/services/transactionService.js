import api from './api';

export const transactionService = {
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    
    if (filters.startDate) queryParams.append('startDate', filters.startDate);
    if (filters.endDate) queryParams.append('endDate', filters.endDate);
    if (filters.type) queryParams.append('type', filters.type);
    if (filters.categoryId) queryParams.append('categoryId', filters.categoryId);
    
    const queryString = queryParams.toString();
    const url = queryString ? `/transactions?${queryString}` : '/transactions';
    
    const response = await api.get(url);
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/transactions/${id}`);
    return response.data;
  },
  
  create: async (transaction) => {
    const response = await api.post('/transactions', transaction);
    return response.data;
  },
  
  update: async (id, transaction) => {
    const response = await api.put(`/transactions/${id}`, transaction);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  },
  
  getMonthlySummary: async (year, month) => {
    const response = await api.get(`/transactions/summary/${year}/${month}`);
    return response.data;
  }
}; 