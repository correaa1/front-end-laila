import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // URL do backend - ajuste conforme necessário
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token JWT nas requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Tratamento específico para erro de autenticação (401)
    if (error.response && error.response.status === 401) {
      // Redirecionar para login ou limpar dados de autenticação
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Se não estiver na página de login, redireciona
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api; 