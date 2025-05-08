import { Flex, Spinner, Text, VStack } from '@chakra-ui/react';

export default function LoadingScreen({ message = 'Carregando...' }) {
  return (
    <Flex
      height="100vh"
      width="100%"
      alignItems="center"
      justifyContent="center"
      background="gray.50"
    >
      <VStack spacing={4}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="brand.500"
          size="xl"
        />
        <Text color="gray.600" fontSize="lg" fontWeight="medium">
          {message}
        </Text>
      </VStack>
    </Flex>
  );
} 