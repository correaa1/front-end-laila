import { useQuery } from '@tanstack/react-query';
import { transactionService } from '../services/transactionService';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export function useMonthlySummary() {
  const currentDate = new Date();
  const [dateFilter, setDateFilter] = useState({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1 // meses começam do 0
  });
  
  const { user } = useAuth();
  const isAuthenticated = !!user;

  const { 
    data,
    isLoading, 
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['monthlySummary', dateFilter.year, dateFilter.month],
    queryFn: () => transactionService.getMonthlySummary(dateFilter.year, dateFilter.month),
    staleTime: 5 * 60 * 1000, // 5 minutos
    enabled: isAuthenticated, 
  });

  // Formatador de moeda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value || 0);
  };

  // Função para mudar o mês/ano do filtro
  const changeMonth = (month, year) => {
    setDateFilter({
      year,
      month
    });
  };

  // Navegar para o mês anterior
  const previousMonth = () => {
    let newMonth = dateFilter.month - 1;
    let newYear = dateFilter.year;
    
    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }
    
    changeMonth(newMonth, newYear);
  };

  // Navegar para o próximo mês
  const nextMonth = () => {
    let newMonth = dateFilter.month + 1;
    let newYear = dateFilter.year;
    
    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }
    
    changeMonth(newMonth, newYear);
  };
  
  // Informações processadas do resumo mensal
  const summary = {
    totalIncome: data?.income || 0,
    totalExpense: data?.expense || 0,
    balance: data?.balance || 0,
    formattedIncome: formatCurrency(data?.income),
    formattedExpense: formatCurrency(data?.expense),
    formattedBalance: formatCurrency(data?.balance),
    // Esses dados não estão disponíveis na API atual
    expensesByCategory: [],
    incomesByCategory: [],
    recentTransactions: [],
  };

  return {
    summary,
    currentDate: dateFilter,
    isLoading,
    isError,
    error,
    refetch,
    previousMonth,
    nextMonth,
    changeMonth,
    formatCurrency
  };
} 