import { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

/**
 * Provedor de autenticação que gerencia o estado de autenticação do usuário
 * e fornece métodos para login, registro e logout
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Recuperar sessão do usuário no carregamento inicial
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  /**
   * Realiza o login do usuário
   * @param {string} email - Email do usuário
   * @param {string} password - Senha do usuário
   * @returns {Promise<boolean>} - Resultado da operação de login
   */
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { accessToken, user: userData } = response.data;
      
      if (!accessToken || !userData) {
        return false;
      }
      
      // Armazenar dados da sessão
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      return true;
    } catch (error) {
      console.error('Erro de autenticação:', error);
      throw error;
    }
  };

  /**
   * Registra um novo usuário
   * @param {string} name - Nome do usuário
   * @param {string} email - Email do usuário
   * @param {string} password - Senha do usuário
   * @returns {Promise<Object>} - Resultado da operação de registro
   */
  const register = async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error };
    }
  };

  /**
   * Verifica o status de autenticação do usuário atual
   * @returns {Promise<boolean>} - Resultado da verificação
   */
  const checkAuthStatus = async () => {
    try {
      const response = await api.get('/auth/me');
      const userData = response.data;
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return true;
    } catch (error) {
      return false;
    }
  };

  /**
   * Realiza o logout do usuário atual
   */
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      loading,
      checkAuthStatus 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook personalizado para acessar o contexto de autenticação
 * @returns {Object} - Contexto de autenticação
 */
export function useAuth() {
  return useContext(AuthContext);
} 