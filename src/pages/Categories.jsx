import { Box, Button, Flex, Heading, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import MainLayout from '../components/Layout/MainLayout';
import { useCategories } from '../hooks/useCategories';
import CategoryModal from '../components/Categories/CategoryModal';
import CategoryList from '../components/Categories/CategoryList';
import DeleteCategoryAlert from '../components/Categories/DeleteCategoryAlert';
import { useState } from 'react';

export default function Categories() {
  const { 
    categories, 
    isLoading, 
    createCategory, 
    updateCategory, 
    deleteCategory,
    isDeleting
  } = useCategories();
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { 
    isOpen: isDeleteAlertOpen, 
    onOpen: onDeleteAlertOpen, 
    onClose: onDeleteAlertClose 
  } = useDisclosure();
  
  const [currentCategory, setCurrentCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const handleAddCategory = () => {
    setCurrentCategory(null);
    onOpen();
  };

  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    onOpen();
  };

  const handleDeleteCategory = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    setCategoryToDelete(category);
    onDeleteAlertOpen();
  };

  const confirmDeleteCategory = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete.id);
      onDeleteAlertClose();
    }
  };

  const handleSaveCategory = (categoryData) => {
    if (currentCategory) {
      updateCategory({ id: currentCategory.id, category: categoryData });
    } else {
      createCategory(categoryData);
    }
    onClose();
  };

  return (
    <MainLayout>
      <Box>
        <Flex justifyContent="space-between" alignItems="center" mb={6}>
          <Heading size="lg">Categorias</Heading>
          <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={handleAddCategory}>
            Nova Categoria
          </Button>
        </Flex>

        <CategoryList 
          categories={categories}
          isLoading={isLoading}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
        />

        <CategoryModal
          isOpen={isOpen}
          onClose={onClose}
          onSave={handleSaveCategory}
          category={currentCategory}
        />

        <DeleteCategoryAlert
          isOpen={isDeleteAlertOpen}
          onClose={onDeleteAlertClose}
          onConfirm={confirmDeleteCategory}
          categoryName={categoryToDelete?.name}
          isLoading={isDeleting}
        />
      </Box>
    </MainLayout>
  );
} 