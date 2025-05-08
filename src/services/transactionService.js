import api from './api';

export const transactionService = {
  /**
   * Busca todas as transações com filtros opcionais
   * @param {Object} filters 
   * @returns {Promise<Object>} 
   */
  getAll: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.startDate) queryParams.append('startDate', filters.startDate);
      if (filters.endDate) queryParams.append('endDate', filters.endDate);
      if (filters.type) queryParams.append('type', filters.type);
      if (filters.categoryId) queryParams.append('categoryId', filters.categoryId);
      
      if (filters.page) queryParams.append('page', filters.page);
      if (filters.pageSize) queryParams.append('pageSize', filters.pageSize);
      
      const queryString = queryParams.toString();
      const url = queryString ? `/transactions?${queryString}` : '/transactions';
      
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
      throw error;
    }
  },
  
  /**
   * @param {string|number} id - ID da transação
   * @returns {Promise<Object>} - Dados da transação
   */
  getById: async (id) => {
    try {
      const response = await api.get(`/transactions/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar transação ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Cria uma nova transação
   * @param {Object} transaction - Dados da transação
   * @returns {Promise<Object>} - Transação criada
   */
  create: async (transaction) => {
    try {
      const response = await api.post('/transactions', transaction);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar transação:', error);
      throw error;
    }
  },
  
  /**
   * Atualiza uma transação existente
   * @param {string|number} id - ID da transação
   * @param {Object} transaction - Novos dados da transação
   * @returns {Promise<Object>} - Transação atualizada
   */
  update: async (id, transaction) => {
    try {
      const response = await api.put(`/transactions/${id}`, transaction);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar transação ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Exclui uma transação
   * @param {string|number} id - ID da transação
   * @returns {Promise<Object>} - Resultado da operação
   */
  delete: async (id) => {
    try {
      const response = await api.delete(`/transactions/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao excluir transação ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Obtém o resumo mensal de transações
   * @param {number} year - Ano
   * @param {number} month - Mês
   * @returns {Promise<Object>} - Resumo mensal
   */
  getMonthlySummary: async (year, month) => {
    try {
      const response = await api.get(`/summaries/monthly?year=${year}&month=${month}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar resumo mensal ${month}/${year}:`, error);
      throw error;
    }
  }
}; 