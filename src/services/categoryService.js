import api from './api';

/**
 * Adapta uma categoria do formato da API para o formato do front-end
 * @param {Object} apiCategory - Categoria no formato da API
 * @returns {Object} - Categoria no formato do front-end
 */
const adaptCategoryFromApi = (apiCategory) => {
  return {
    id: apiCategory.id,
    name: apiCategory.name,
    description: apiCategory.description || '', 
    updatedAt: apiCategory.updatedAt,
    userId: apiCategory.userId
  };
};

/**
 * Adapta uma lista de categorias do formato da API para o formato do front-end
 * @param {Array} apiCategories 
 * @returns {Array} 
 */
const adaptCategoriesFromApi = (apiCategories) => {
  if (!Array.isArray(apiCategories)) return [];
  return apiCategories.map(adaptCategoryFromApi);
};

/**
 * Adapta uma categoria do formato do front-end para o formato da API
 * @param {Object} category - Categoria no formato do front-end
 * @returns {Object} - Categoria no formato da API
 */
const adaptCategoryToApi = (category) => {
  return {
    name: category.name
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
      return { message: data.message || 'Categoria não encontrada.' };
    
    case 409:
      return { message: data.message || 'Não é possível excluir esta categoria porque ela está sendo usada em transações.' };
    
    case 500:
      return { message: 'Erro no servidor. Tente novamente mais tarde.' };
    
    default:
      return { message: data.message || defaultMessage };
  }
};

export const categoryService = {
  getAll: async () => {
    try {
      const response = await api.get('/categories');
      return adaptCategoriesFromApi(response.data);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      throw handleApiError(error);
    }
  },
  
  getById: async (id) => {
    try {
      const response = await api.get(`/categories/${id}`);
      return adaptCategoryFromApi(response.data);
    } catch (error) {
      console.error(`Erro ao buscar categoria ${id}:`, error);
      throw handleApiError(error);
    }
  },
  
  create: async (category) => {
    try {
      const apiCategory = adaptCategoryToApi(category);
      const response = await api.post('/categories', apiCategory);
      return adaptCategoryFromApi(response.data);
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      throw handleApiError(error);
    }
  },
  
  update: async (id, category) => {
    try {
      const apiCategory = adaptCategoryToApi(category);
      const response = await api.put(`/categories/${id}`, apiCategory);
      return adaptCategoryFromApi(response.data);
    } catch (error) {
      console.error(`Erro ao atualizar categoria ${id}:`, error);
      throw handleApiError(error);
    }
  },
  
  delete: async (id) => {
    try {
      const response = await api.delete(`/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao excluir categoria ${id}:`, error);
      throw handleApiError(error);
    }
  }
}; 