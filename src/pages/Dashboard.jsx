import { Box, Heading, SimpleGrid, Flex, Alert, AlertIcon, Spinner, Text, useColorModeValue } from '@chakra-ui/react';
import MainLayout from '../components/Layout/MainLayout';
import { useMonthlySummary } from '../hooks/useMonthlySummary';
import MonthSelector from '../components/Dashboard/MonthSelector';
import SummaryCard from '../components/Dashboard/SummaryCard';
import { IncomeIcon, ExpenseIcon, BalanceIcon } from '../components/Dashboard/DashboardIcons';

export default function Dashboard() {
  const { 
    summary, 
    currentDate, 
    isLoading, 
    isError, 
    previousMonth, 
    nextMonth,
    formatCurrency
  } = useMonthlySummary();

  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  if (isError) {
    return (
      <MainLayout>
        <Alert status="error" borderRadius="md" mb={6}>
          <AlertIcon />
          Ocorreu um erro ao carregar os dados do resumo mensal.
        </Alert>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Heading size="lg" mb={6}>Dashboard Financeiro</Heading>
      
      <Box mb={6}>
        <MonthSelector
          month={currentDate.month}
          year={currentDate.year}
          onPrevious={previousMonth}
          onNext={nextMonth}
        />
      </Box>

      {isLoading ? (
        <Flex justify="center" align="center" p={10}>
          <Spinner size="xl" color="teal.500" thickness="4px" />
        </Flex>
      ) : (
        <>
          <SimpleGrid 
            columns={{ base: 1, sm: 2, lg: 3 }} 
            spacing={6} 
            mb={6} 
            width="100%"
          >
            <SummaryCard
              title="Receitas"
              value={summary.formattedIncome}
              icon={IncomeIcon}
              type="income"
              isLoading={isLoading}
            />
            <SummaryCard
              title="Despesas"
              value={summary.formattedExpense}
              icon={ExpenseIcon}
              type="expense"
              isLoading={isLoading}
            />
            <SummaryCard
              title="Saldo"
              value={summary.formattedBalance}
              icon={BalanceIcon}
              type={summary.balance >= 0 ? "income" : "expense"}
              isLoading={isLoading}
            />
          </SimpleGrid>

         
        </>
      )}
    </MainLayout>
  );
} 