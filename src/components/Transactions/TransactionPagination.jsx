import { Button, Flex, Text, Select, HStack, Box } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

export default function TransactionPagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  pageSize = 10,
  onPageSizeChange,
  totalItems = 0,
}) {
  const handlePageSizeChange = (e) => {
    onPageSizeChange(Number(e.target.value));
  };

  // Calcula os itens mostrados atualmente
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(startItem + pageSize - 1, totalItems);

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      w="100%"
      mt={6}
      flexWrap={{ base: 'wrap', md: 'nowrap' }}
    >
      <Box mb={{ base: 4, md: 0 }} w={{ base: '100%', md: 'auto' }}>
        <Text fontSize="sm" color="gray.600">
          Mostrando {totalItems > 0 ? startItem : 0}-{endItem} de {totalItems} itens
        </Text>
      </Box>

      <HStack spacing={4}>
        <Select
          value={pageSize}
          onChange={handlePageSizeChange}
          size="sm"
          w="120px"
          borderRadius="md"
        >
          <option value={5}>5 por página</option>
          <option value={10}>10 por página</option>
          <option value={20}>20 por página</option>
          <option value={50}>50 por página</option>
        </Select>

        <HStack>
          <Button
            leftIcon={<ChevronLeftIcon />}
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            isDisabled={currentPage === 1}
            variant="outline"
          >
            Anterior
          </Button>
          
          <Flex>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => {
                // Mostrar apenas páginas próximas da atual para evitar muitos botões
                return (
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 1
                );
              })
              .map((page, index, array) => {
                // Adicionar ellipsis se houver lacunas
                const prevPage = array[index - 1];
                const showEllipsisBefore = prevPage && page - prevPage > 1;

                return (
                  <Box key={page}>
                    {showEllipsisBefore && (
                      <Button
                        size="sm"
                        variant="ghost"
                        cursor="default"
                        _hover={{ bg: "transparent" }}
                        mx={1}
                      >
                        ...
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant={currentPage === page ? "solid" : "ghost"}
                      colorScheme={currentPage === page ? "teal" : "gray"}
                      onClick={() => onPageChange(page)}
                      mx={1}
                    >
                      {page}
                    </Button>
                  </Box>
                );
              })}
          </Flex>
          
          <Button
            rightIcon={<ChevronRightIcon />}
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            isDisabled={currentPage === totalPages}
            variant="outline"
          >
            Próxima
          </Button>
        </HStack>
      </HStack>
    </Flex>
  );
} 