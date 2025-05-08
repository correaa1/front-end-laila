import api from './api';

/**
 * Adapta uma transação do formato da API para o formato do front-end
 * @param {Object} apiTransaction - Transação no formato da API
 * @returns {Object} - Transação no formato do front-end
 */
const adaptTransactionFromApi = (apiTransaction) => {
  return {
    id: apiTransaction.id,
    description: apiTransaction.title,
    amount: parseFloat(apiTransaction.amount),
    type: apiTransaction.type === 'RECEITA' ? 'income' : 'expense',
    date: apiTransaction.date,
    createdAt: apiTransaction.createdAt,
    updatedAt: apiTransaction.updatedAt,
    userId: apiTransaction.userId,
    categoryId: apiTransaction.categoryId,
    category: apiTransaction.category,
    notes: apiTransaction.notes
  };
};

/**
 * Adapta uma lista de transações do formato da API para o formato do front-end
 * @param {Array} apiTransactions - Lista de transações no formato da API
 * @returns {Array} - Lista de transações no formato do front-end
 */
const adaptTransactionsFromApi = (apiTransactions) => {
  if (!Array.isArray(apiTransactions)) return [];
  return apiTransactions.map(adaptTransactionFromApi);
};

/**
 * Adapta uma transação do formato do front-end para o formato da API
 * @param {Object} transaction - Transação no formato do front-end
 * @returns {Object} - Transação no formato da API
 */
const adaptTransactionToApi = (transaction) => {
  return {
    title: transaction.description,
    amount: transaction.amount,
    type: transaction.type === 'income' ? 'RECEITA' : 'DESPESA',
    date: transaction.date,
    categoryId: transaction.categoryId
  };
};

/**
 * Trata erros da API e retorna mensagens amigáveis
 * @param {Error} error - Erro retornado pela API
 * @returns {Object} - Objeto com mensagem de erro formatada
 */
const handleApiError = (error) => {
  const defaultMessage = 'Ocorreu um erro ao processar sua solicitação.';
  
  if (!error.response) {
    return { message: 'Erro de conexão com o servidor. Verifique sua internet.' };
  }
  
  const { status, data } = error.response;
  
  switch (status) {
    case 400:
      // Erros de validação
      if (Array.isArray(data.message)) {
        return { message: data.message.join(', ') };
      }
      return { message: data.message || 'Dados inválidos. Verifique as informações fornecidas.' };
    
    case 401:
      return { message: 'Sessão expirada. Por favor, faça login novamente.' };
    
    case 403:
      return { message: 'Você não tem permissão para acessar este recurso.' };
    
    case 404:
      return { message: data.message || 'Registro não encontrado.' };
    
    case 500:
      return { message: 'Erro no servidor. Tente novamente mais tarde.' };
    
    default:
      return { message: data.message || defaultMessage };
  }
};

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
      
      // Mapear o tipo para o formato da API
      if (filters.type) {
        const apiType = filters.type === 'income' ? 'RECEITA' : 'DESPESA';
        queryParams.append('type', apiType);
      }
      
      if (filters.categoryId) queryParams.append('categoryId', filters.categoryId);
      
      if (filters.page) queryParams.append('page', filters.page);
      if (filters.pageSize) queryParams.append('pageSize', filters.pageSize);
      
      const queryString = queryParams.toString();
      const url = queryString ? `/transactions?${queryString}` : '/transactions';
      
      const response = await api.get(url);
      
      const adaptedData = adaptTransactionsFromApi(response.data);
      
      // Se houver informações de paginação
      if (response.data.pagination) {
        return {
          data: adaptedData,
          pagination: response.data.pagination
        };
      }
      
      return adaptedData;
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
      throw handleApiError(error);
    }
  },
  
  /**
   * @param {string|number} id - ID da transação
   * @returns {Promise<Object>} - Dados da transação
   */
  getById: async (id) => {
    try {
      const response = await api.get(`/transactions/${id}`);
      return adaptTransactionFromApi(response.data);
    } catch (error) {
      console.error(`Erro ao buscar transação ${id}:`, error);
      throw handleApiError(error);
    }
  },
  
  /**
   * Cria uma nova transação
   * @param {Object} transaction - Dados da transação
   * @returns {Promise<Object>} - Transação criada
   */
  create: async (transaction) => {
    try {
      const apiTransaction = adaptTransactionToApi(transaction);
      const response = await api.post('/transactions', apiTransaction);
      return adaptTransactionFromApi(response.data);
    } catch (error) {
      console.error('Erro ao criar transação:', error);
      throw handleApiError(error);
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
      const apiTransaction = adaptTransactionToApi(transaction);
      const response = await api.put(`/transactions/${id}`, apiTransaction);
      return adaptTransactionFromApi(response.data);
    } catch (error) {
      console.error(`Erro ao atualizar transação ${id}:`, error);
      throw handleApiError(error);
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
      throw handleApiError(error);
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
      
      // Adaptar os dados do resumo se necessário
      return {
        income: parseFloat(response.data.income || 0),
        expense: parseFloat(response.data.expense || 0),
        balance: parseFloat(response.data.balance || 0)
      };
    } catch (error) {
      console.error(`Erro ao buscar resumo mensal ${month}/${year}:`, error);
      throw handleApiError(error);
    }
  }
}; 