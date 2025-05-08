import { Box, Heading } from '@chakra-ui/react';
import MainLayout from '../components/Layout/MainLayout';

export default function Dashboard() {
  return (
    <MainLayout>
      <Box>
        <Heading size="lg" mb={6}>Dashboard</Heading>
      </Box>
    </MainLayout>
  );
} 