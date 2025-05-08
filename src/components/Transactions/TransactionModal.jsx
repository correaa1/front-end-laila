import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import TransactionForm from './TransactionForm';

export default function TransactionModal({
  isOpen,
  onClose,
  transaction = null,
  categories = [],
  onSubmit,
  isLoading = false,
}) {
  const isEditing = !!transaction;
  const title = isEditing ? 'Editar Transação' : 'Nova Transação';

  const handleSubmit = (data, isEditing) => {
    onSubmit(data, isEditing);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <TransactionForm
            transaction={transaction}
            categories={categories}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

// Componente de botão para abrir o modal de nova transação
export function NewTransactionButton({ onClick }) {
  return (
    <Button
      onClick={onClick}
      colorScheme="teal"
      leftIcon={<AddIcon />}
      variant="solid"
      size="md"
    >
      Nova Transação
    </Button>
  );
} 