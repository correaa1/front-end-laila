import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * Hook para verificar o status de autenticação do usuário
 * com verificação robusta de tokens e redirecionamento adequado
 */
export function useAuthStatus() {
  const { user, loading: authLoading, checkAuthStatus } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifyAuth() {
      if (!authLoading) {
        try {
          // Verificar se o token existe no localStorage
          const token = localStorage.getItem('accessToken');
          
          if (!token) {
            // Se não há token, o usuário não está logado
            setIsLoggedIn(false);
            setLoading(false);
            return;
          }
          
          // Se há token mas não há usuário no contexto, verificar autenticação
          if (!user) {
            const authValid = await checkAuthStatus();
            setIsLoggedIn(authValid);
          } else {
            // Já temos o usuário no contexto, confirmar como logado
            setIsLoggedIn(true);
          }
        } catch (error) {
          // Em caso de falha na verificação, considerar como não autenticado
          console.error('Erro ao verificar autenticação:', error);
          setIsLoggedIn(false);
          
          // Limpar dados inválidos de autenticação
          if (error.response?.status === 401) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
          }
        } finally {
          setLoading(false);
        }
      }
    }
    
    verifyAuth();
  }, [user, authLoading, checkAuthStatus]);

  return { isLoggedIn, loading, user };
} 