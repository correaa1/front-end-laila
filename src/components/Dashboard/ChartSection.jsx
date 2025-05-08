import { Box, Heading, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

export default function ChartSection({ expensesByCategory, incomesByCategory, isLoading, formatCurrency }) {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', 
    '#82CA9D', '#A4DE6C', '#D0ED57', '#FFC658', '#FF8C00'
  ];

  // Renderizador personalizado para os valores no gráfico
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Customização do tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Box p={2} bg="white" borderRadius="md" boxShadow="md">
          <Text fontWeight="bold">{payload[0].name}</Text>
          <Text>{formatCurrency(payload[0].value)}</Text>
        </Box>
      );
    }
    return null;
  };

  // Se estiver carregando ou não houver dados, exibir mensagem
  if (isLoading) {
    return (
      <Box p={4} textAlign="center">
        <Text>Carregando gráficos...</Text>
      </Box>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={6}>
      <Box 
        p={4} 
        borderWidth="1px" 
        borderRadius="lg" 
        borderColor={borderColor}
        bg={bg}
      >
        <Heading size="md" mb={4}>Despesas por Categoria</Heading>
        {expensesByCategory.length === 0 ? (
          <Text textAlign="center" py={10} color="gray.500">
            Nenhuma despesa registrada neste mês
          </Text>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expensesByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {expensesByCategory.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </Box>

      <Box 
        p={4} 
        borderWidth="1px" 
        borderRadius="lg" 
        borderColor={borderColor}
        bg={bg}
      >
        <Heading size="md" mb={4}>Receitas por Categoria</Heading>
        {incomesByCategory.length === 0 ? (
          <Text textAlign="center" py={10} color="gray.500">
            Nenhuma receita registrada neste mês
          </Text>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={incomesByCategory}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" name="Valor" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Box>
    </SimpleGrid>
  );
} 