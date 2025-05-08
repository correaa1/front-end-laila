import {
  Box,
  Button,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  IconButton,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { MdEdit, MdDelete } from 'react-icons/md';

export default function CategoryList({
  categories = [],
  onEdit,
  onDelete,
  isLoading,
}) {
  if (isLoading) {
    return (
      <Stack spacing={4}>
        {[...Array(5)].map((_, i) => (
          <Box
            key={i}
            p={4}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
          >
            <Skeleton height="20px" width="40%" mb={2} />
            <Skeleton height="16px" width="60%" />
          </Box>
        ))}
      </Stack>
    );
  }

  if (!categories.length) {
    return (
      <Box textAlign="center" py={10} px={6}>
        <Text fontSize="lg" mt={3} mb={6}>
          Nenhuma categoria encontrada. Adicione sua primeira categoria!
        </Text>
      </Box>
    );
  }

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>NOME</Th>
            <Th>DESCRIÇÃO</Th>
            <Th width="120px">AÇÕES</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categories.map((category) => (
            <Tr key={category.id}>
              <Td fontWeight="medium">{category.name}</Td>
              <Td>
                {/* Usamos um valor padrão vazio se description for undefined */}
                {category.description || ''}
              </Td>
              <Td>
                <Flex gap={2}>
                  <IconButton
                    icon={<Icon as={MdEdit} />}
                    size="sm"
                    colorScheme="blue"
                    aria-label="Editar categoria"
                    onClick={() => onEdit(category)}
                  />
                  <IconButton
                    icon={<Icon as={MdDelete} />}
                    size="sm"
                    colorScheme="red"
                    aria-label="Excluir categoria"
                    onClick={() => onDelete(category.id)}
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
} 