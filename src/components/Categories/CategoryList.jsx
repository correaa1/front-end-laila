import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Box,
  Text,
  HStack,
  Skeleton,
  useColorModeValue,
  TableContainer,
  Badge,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

export default function CategoryList({
  categories = [],
  isLoading = false,
  onEdit,
  onDelete,
}) {
  const evenRowBg = useColorModeValue('gray.50', 'gray.700');
  const tableBg = useColorModeValue('white', 'gray.800');
  const headerBg = useColorModeValue('gray.50', 'gray.700');

  if (isLoading) {
    return (
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" bg={tableBg}>
        <TableContainer>
          <Table variant="simple" size="md">
            <Thead bg={headerBg}>
              <Tr>
                <Th>NOME</Th>
                <Th>DESCRIÇÃO</Th>
                <Th>TIPO</Th>
                <Th>AÇÕES</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Array(5)
                .fill('')
                .map((_, i) => (
                  <Tr key={i}>
                    <Td><Skeleton height="20px" width="120px" /></Td>
                    <Td><Skeleton height="20px" width="180px" /></Td>
                    <Td><Skeleton height="20px" width="80px" /></Td>
                    <Td><Skeleton height="20px" width="80px" /></Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    );
  }

  if (categories.length === 0) {
    return (
      <Box
        p={8}
        borderWidth="1px"
        borderRadius="lg"
        textAlign="center"
        bg={tableBg}
      >
        <Text fontSize="lg" color="gray.500">
          Nenhuma categoria encontrada
        </Text>
        <Text fontSize="sm" color="gray.400" mt={2}>
          Adicione uma nova categoria para organizar suas transações
        </Text>
      </Box>
    );
  }

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" bg={tableBg}>
      <TableContainer>
        <Table variant="simple" size="md">
          <Thead bg={headerBg}>
            <Tr>
              <Th>NOME</Th>
              <Th>DESCRIÇÃO</Th>
              <Th>TIPO</Th>
              <Th>AÇÕES</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories.map((category, index) => (
              <Tr 
                key={category.id} 
                bg={index % 2 === 1 ? evenRowBg : 'transparent'}
              >
                <Td>
                  <Text fontWeight="medium">{category.name}</Text>
                </Td>
                <Td>{category.description || '-'}</Td>
                <Td>
                  <Badge
                    colorScheme={category.type === 'expense' ? 'red' : 'green'}
                    variant="solid"
                    px={2}
                    py={1}
                    borderRadius="full"
                  >
                    {category.type === 'expense' ? 'Despesa' : 'Receita'}
                  </Badge>
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton
                      aria-label="Editar categoria"
                      icon={<EditIcon />}
                      size="sm"
                      colorScheme="blue"
                      variant="ghost"
                      onClick={() => onEdit(category)}
                    />
                    <IconButton
                      aria-label="Excluir categoria"
                      icon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                      onClick={() => onDelete(category.id)}
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
} 