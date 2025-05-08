import { useState } from 'react';
import {
  Box,
  Heading,
  Flex,
  Spacer,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import MainLayout from '../components/Layout/MainLayout';
import TransactionList from '../components/Transactions/TransactionList';
import TransactionFilter from '../components/Transactions/TransactionFilter';
import TransactionModal, { NewTransactionButton } from '../components/Transactions/TransactionModal';
import { useTransactions } from '../hooks/useTransactions';
import { useCategories } from '../hooks/useCategories';

export default function Transactions() {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const {
    transactions,
    pagination,
    filters,
    isLoading: isLoadingTransactions,
    isError: isErrorTransactions,
    error: transactionsError,
    setFilters,
    setPage,
    setPageSize,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    isCreating,
    isUpdating,
    isDeleting,
  } = useTransactions();
  
  const {
    categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useCategories();

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const handleAddClick = () => {
    setSelectedTransaction(null);
    onOpen();
  };

  const handleEditClick = (transaction) => {
    setSelectedTransaction(transaction);
    onOpen();
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta transação?')) {
      deleteTransaction(id);
    }
  };

  const handleSubmit = (data, isEditing) => {
    if (isEditing) {
      updateTransaction({ id: selectedTransaction.id, transaction: data });
    } else {
      createTransaction(data);
    }
    onClose();
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
    onClose();
  };

  if (isErrorTransactions || isErrorCategories) {
    return (
      <MainLayout>
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          <AlertTitle>Erro ao carregar dados</AlertTitle>
          <AlertDescription>
            {isErrorTransactions && transactionsError?.message}
            {isErrorCategories && 'Não foi possível carregar as categorias'}
          </AlertDescription>
        </Alert>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Box width="100%">
        <Flex align="center" mb={4}>
          <Heading size="lg">Lançamentos Financeiros</Heading>
          <Spacer />
          <NewTransactionButton onClick={handleAddClick} />
        </Flex>

        <TransactionFilter
          categories={categories || []}
          onFilter={handleFilter}
          isLoading={isLoadingTransactions}
        />

        <TransactionList
          transactions={transactions}
          isLoading={isLoadingTransactions || isLoadingCategories}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          pagination={pagination}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />

        <TransactionModal
          isOpen={isOpen}
          onClose={handleCloseModal}
          transaction={selectedTransaction}
          categories={categories || []}
          onSubmit={handleSubmit}
          isLoading={isCreating || isUpdating}
        />
      </Box>
    </MainLayout>
  );
} 