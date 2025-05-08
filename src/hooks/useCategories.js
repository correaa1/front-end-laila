import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '../services/categoryService';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export function useCategories() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const navigate = useNavigate();

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
    
    toast({
      title: 'Erro',
      description: error.message,
      status: 'error',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
  };

  // Buscar todas as categorias
  const { 
    data: categories = [], 
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAll(),
    staleTime: 10 * 60 * 1000, // 10 minutos - categorias mudam com menos frequência
    retry: 1,
    enabled: !!localStorage.getItem('accessToken'), // Só executar se houver token
  });

  // Adicionar uma nova categoria
  const createMutation = useMutation({
    mutationFn: (category) => categoryService.create(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: 'Categoria adicionada',
        description: 'A categoria foi adicionada com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: handleError
  });

  // Atualizar uma categoria existente
  const updateMutation = useMutation({
    mutationFn: ({ id, category }) => categoryService.update(id, category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      // Isso também afetará as transações que usam essas categorias
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast({
        title: 'Categoria atualizada',
        description: 'A categoria foi atualizada com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: handleError
  });

  // Excluir uma categoria
  const deleteMutation = useMutation({
    mutationFn: (id) => categoryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      // Isso também afetará as transações que usam essa categoria
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast({
        title: 'Categoria excluída',
        description: 'A categoria foi excluída com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: handleError
  });

  return {
    categories,
    isLoading,
    isError,
    error,
    refetch,
    createCategory: createMutation.mutate,
    updateCategory: updateMutation.mutate,
    deleteCategory: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
} 