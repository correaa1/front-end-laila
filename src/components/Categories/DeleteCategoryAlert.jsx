import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useRef } from 'react';

export default function DeleteCategoryAlert({
  isOpen,
  onClose,
  onConfirm,
  categoryName,
  isLoading,
}) {
  const cancelRef = useRef();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Excluir Categoria
          </AlertDialogHeader>

          <AlertDialogBody>
            Tem certeza que deseja excluir a categoria "{categoryName}"?
            <br />
            <br />
            <strong>Atenção:</strong> Excluir uma categoria pode afetar transações que a utilizam.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              colorScheme="red" 
              onClick={onConfirm} 
              ml={3}
              isLoading={isLoading}
            >
              Excluir
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
} 