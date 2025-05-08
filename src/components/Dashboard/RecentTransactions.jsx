import {
  Box,
  Heading,
  Text,
  Flex,
  Badge,
  VStack,
  HStack,
  Divider,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function RecentTransactions({ transactions = [], isLoading, formatCurrency }) {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  if (isLoading) {
    return (
      <Box 
        p={4} 
        borderWidth="1px" 
        borderRadius="lg" 
        borderColor={borderColor}
        bg={bg}
      >
        <Heading size="md" mb={4}>Transações Recentes</Heading>
        <Text textAlign="center" py={4}>Carregando transações...</Text>
      </Box>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <Box 
        p={4} 
        borderWidth="1px" 
        borderRadius="lg" 
        borderColor={borderColor}
        bg={bg}
      >
        <Heading size="md" mb={4}>Transações Recentes</Heading>
        <Text textAlign="center" py={4} color={textColor}>
          Nenhuma transação registrada neste mês
        </Text>
      </Box>
    );
  }

  return (
    <Box 
      p={4} 
      borderWidth="1px" 
      borderRadius="lg" 
      borderColor={borderColor}
      bg={bg}
    >
      <Heading size="md" mb={4}>Transações Recentes</Heading>
      
      <VStack spacing={3} align="stretch">
        {transactions.map((transaction) => (
          <Box key={transaction.id}>
            <Flex justify="space-between" align="center">
              <HStack spacing={3}>
                <Icon 
                  as={transaction.type === 'income' ? ArrowUpIcon : ArrowDownIcon} 
                  boxSize={5} 
                  color={transaction.type === 'income' ? 'green.500' : 'red.500'} 
                  bg={transaction.type === 'income' ? 'green.100' : 'red.100'}
                  p={1}
                  borderRadius="full"
                />
                
                <Box>
                  <Text fontWeight="medium">{transaction.description}</Text>
                  <Text fontSize="sm" color={textColor}>
                    {format(new Date(transaction.date), 'dd MMM yyyy', { locale: ptBR })}
                    {' • '}
                    <Badge 
                      colorScheme={transaction.type === 'income' ? 'green' : 'red'}
                      variant="subtle"
                      fontSize="xs"
                    >
                      {transaction.category.name}
                    </Badge>
                  </Text>
                </Box>
              </HStack>
              
              <Text 
                fontWeight="bold" 
                color={transaction.type === 'income' ? 'green.500' : 'red.500'}
              >
                {formatCurrency(transaction.amount)}
              </Text>
            </Flex>
            <Divider mt={3} />
          </Box>
        ))}
      </VStack>
    </Box>
  );
} 