import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '../services/categoryService';
import { useToast } from '@chakra-ui/react';

export function useCategories() {
  const queryClient = useQueryClient();
  const toast = useToast();

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
    onError: (error) => {
      toast({
        title: 'Erro ao adicionar',
        description: error.response?.data?.message || 'Não foi possível adicionar a categoria',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
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
    onError: (error) => {
      toast({
        title: 'Erro ao atualizar',
        description: error.response?.data?.message || 'Não foi possível atualizar a categoria',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
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
    onError: (error) => {
      toast({
        title: 'Erro ao excluir',
        description: error.response?.data?.message || 'Não foi possível excluir a categoria',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
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