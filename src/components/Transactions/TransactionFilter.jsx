import { useState } from 'react';
import {
  Box,
  Stack,
  HStack,
  Input,
  FormControl,
  FormLabel,
  Select,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

export default function TransactionFilter({
  categories = [],
  onFilter,
  isLoading = false,
}) {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    type: '',
    categoryId: '',
  });

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({
      startDate: '',
      endDate: '',
      type: '',
      categoryId: '',
    });
    onFilter({});
  };

  return (
    <Box
      mb={4}
      p={4}
      bg={bgColor}
      borderRadius="md"
      borderWidth="1px"
      borderColor={borderColor}
    >
      <form onSubmit={handleSubmit}>
        <Stack 
          spacing={4}
          direction={{ base: 'column', md: 'row' }}
          mb={4}
        >
          <FormControl>
            <FormLabel>Data Inicial</FormLabel>
            <Input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleChange}
              placeholder="dd/mm/aaaa"
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Data Final</FormLabel>
            <Input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleChange}
              placeholder="dd/mm/aaaa"
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Tipo</FormLabel>
            <Select
              name="type"
              value={filters.type}
              onChange={handleChange}
              placeholder="Todos"
            >
              <option value="income">Receitas</option>
              <option value="expense">Despesas</option>
            </Select>
          </FormControl>
          
          <FormControl>
            <FormLabel>Categoria</FormLabel>
            <Select
              name="categoryId"
              value={filters.categoryId}
              onChange={handleChange}
              placeholder="Todas"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Stack>
        
        <HStack justifyContent="flex-end" spacing={3}>
          <Button
            variant="outline"
            onClick={handleReset}
            isDisabled={isLoading}
          >
            Limpar
          </Button>
          <Button
            type="submit"
            colorScheme="teal"
            leftIcon={<SearchIcon />}
            isLoading={isLoading}
          >
            Filtrar
          </Button>
        </HStack>
      </form>
    </Box>
  );
} 