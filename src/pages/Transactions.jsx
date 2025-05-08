import { Box, Heading } from '@chakra-ui/react';
import MainLayout from '../components/Layout/MainLayout';

export default function Transactions() {
  return (
    <MainLayout>
      <Box>
        <Heading size="lg" mb={6}>Lançamentos Financeiros</Heading>
      </Box>
    </MainLayout>
  );
} 