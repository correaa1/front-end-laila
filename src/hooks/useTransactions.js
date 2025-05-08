import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionService } from '../services/transactionService';
import { useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Hook para gerenciamento de transações com tratamento robusto de autenticação
 * @param {Object} initialFilters - Filtros iniciais
 * @returns {Object} - Métodos e estados para gerenciamento de transações
 */
export function useTransactions(initialFilters = {}) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const navigate = useNavigate();
  const [filters, setFilters] = useState(initialFilters);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalPages: 1,
    totalItems: 0
  });

  // Verificar token de autenticação antes de carregar
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      // redirect to login
      navigate('/login');
      
      toast({
        title: 'Sessão expirada',
        description: 'Por favor, faça login novamente para continuar',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  }, [navigate, toast]);

  // Buscar todas as transações 
  const { 
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['transactions', filters, pagination.currentPage, pagination.pageSize],
    queryFn: async () => {
      // Verificar autenticação antes de fazer a requisição
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Não autenticado');
      }
      
      // Incluir paginação nos filtros
      const paginatedFilters = {
        ...filters,
        page: pagination.currentPage,
        pageSize: pagination.pageSize
      };
      
      const response = await transactionService.getAll(paginatedFilters);
      
      // Atualizar informações de paginação com base na resposta da API
      if (response.pagination) {
        setPagination({
          currentPage: response.pagination.currentPage,
          pageSize: response.pagination.pageSize,
          totalPages: response.pagination.totalPages,
          totalItems: response.pagination.totalItems
        });
        
        return response.data;
      }
      
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 1, // Limitar retry para evitar loop infinito 
    enabled: !!localStorage.getItem('accessToken'), // Só executar se houver token
  });

  const handlePageChange = (newPage) => {
    setPagination(prev => ({
      ...prev,
      currentPage: newPage
    }));
  };

  // Função para mudar o tamanho da página
  const handlePageSizeChange = (newSize) => {
    setPagination(prev => ({
      ...prev,
      pageSize: newSize,
      currentPage: 1 
    }));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination(prev => ({
      ...prev,
      currentPage: 1 
    }));
  };

  const handleError = (error) => {
    if (error.message === 'Sessão expirada. Por favor, faça login novamente.') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      navigate('/login');
      
      toast({
        title: 'Sessão expirada',
        description: 'Por favor, faça login novamente para continuar',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }
    
    // Para outros tipos de erro
    toast({
      title: 'Erro',
      description: error.message,
      status: 'error',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
  };

  // Adicionar uma nova transação
  const createMutation = useMutation({
    mutationFn: (transaction) => transactionService.create(transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast({
        title: 'Transação adicionada',
        description: 'A transação foi adicionada com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: handleError
  });

  // Atualizar uma transação existente
  const updateMutation = useMutation({
    mutationFn: ({ id, transaction }) => transactionService.update(id, transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast({
        title: 'Transação atualizada',
        description: 'A transação foi atualizada com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: handleError
  });

  // Excluir uma transação
  const deleteMutation = useMutation({
    mutationFn: (id) => transactionService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast({
        title: 'Transação excluída',
        description: 'A transação foi excluída com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: handleError
  });

  return {
    transactions: data || [],
    pagination,
    filters,
    isLoading,
    isError,
    error,
    refetch,
    setFilters: handleFilterChange,
    setPage: handlePageChange,
    setPageSize: handlePageSizeChange,
    createTransaction: createMutation.mutate,
    updateTransaction: updateMutation.mutate,
    deleteTransaction: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
} 