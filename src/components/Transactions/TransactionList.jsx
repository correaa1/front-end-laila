import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Badge,
  Box,
  Text,
  HStack,
  Skeleton,
  useColorModeValue,
  TableContainer,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import TransactionPagination from './TransactionPagination';

export default function TransactionList({
  transactions = [],
  isLoading = false,
  onEdit,
  onDelete,
  pagination = {
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalItems: 0,
  },
  onPageChange,
  onPageSizeChange,
}) {
  const evenRowBg = useColorModeValue('gray.50', 'gray.700');
  const tableBg = useColorModeValue('white', 'gray.800');
  const headerBg = useColorModeValue('gray.50', 'gray.700');

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  if (isLoading) {
    return (
      <Box>
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" bg={tableBg}>
          <TableContainer>
            <Table variant="simple" size="md">
              <Thead bg={headerBg}>
                <Tr>
                  <Th>DATA</Th>
                  <Th>DESCRIÇÃO</Th>
                  <Th>CATEGORIA</Th>
                  <Th isNumeric>VALOR</Th>
                  <Th>TIPO</Th>
                  <Th>AÇÕES</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Array(5)
                  .fill('')
                  .map((_, i) => (
                    <Tr key={i}>
                      <Td><Skeleton height="20px" width="90px" /></Td>
                      <Td><Skeleton height="20px" width="150px" /></Td>
                      <Td><Skeleton height="20px" width="120px" /></Td>
                      <Td isNumeric><Skeleton height="20px" width="80px" /></Td>
                      <Td><Skeleton height="20px" width="80px" /></Td>
                      <Td><Skeleton height="20px" width="80px" /></Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box mt={4}>
          <Skeleton height="40px" />
        </Box>
      </Box>
    );
  }

  if (transactions.length === 0) {
    return (
      <Box
        p={8}
        borderWidth="1px"
        borderRadius="lg"
        textAlign="center"
        bg={tableBg}
      >
        <Text fontSize="lg" color="gray.500">
          Nenhuma transação encontrada
        </Text>
        <Text fontSize="sm" color="gray.400" mt={2}>
          Adicione uma nova transação para começar a controlar suas finanças
        </Text>
      </Box>
    );
  }

  return (
    <Box>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" bg={tableBg}>
        <TableContainer>
          <Table variant="simple" size="md">
            <Thead bg={headerBg}>
              <Tr>
                <Th>DATA</Th>
                <Th>DESCRIÇÃO</Th>
                <Th>CATEGORIA</Th>
                <Th isNumeric>VALOR</Th>
                <Th>TIPO</Th>
                <Th>AÇÕES</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((transaction, index) => (
                <Tr 
                  key={transaction.id} 
                  bg={index % 2 === 1 ? evenRowBg : 'transparent'}
                >
                  <Td>
                    {format(new Date(transaction.date), 'dd/MM/yyyy', { locale: ptBR })}
                  </Td>
                  <Td>
                    <Text fontWeight="medium">{transaction.description}</Text>
                  </Td>
                  <Td>
                    <Badge px={2} py={1} borderRadius="full">
                      {transaction.category.name}
                    </Badge>
                  </Td>
                  <Td isNumeric fontWeight="bold" color={transaction.type === 'expense' ? 'expense.500' : 'income.500'}>
                    {formatCurrency(transaction.amount)}
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={transaction.type === 'expense' ? 'red' : 'green'}
                      variant="solid"
                      px={2}
                      py={1}
                      borderRadius="full"
                    >
                      {transaction.type === 'expense' ? 'Despesa' : 'Receita'}
                    </Badge>
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      <IconButton
                        aria-label="Editar transação"
                        icon={<EditIcon />}
                        size="sm"
                        colorScheme="blue"
                        variant="ghost"
                        onClick={() => onEdit(transaction)}
                      />
                      <IconButton
                        aria-label="Excluir transação"
                        icon={<DeleteIcon />}
                        size="sm"
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => onDelete(transaction.id)}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      
      {pagination.totalItems > 0 && (
        <Box mt={4}>
          <TransactionPagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            pageSize={pagination.pageSize}
            totalItems={pagination.totalItems}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </Box>
      )}
    </Box>
  );
} 