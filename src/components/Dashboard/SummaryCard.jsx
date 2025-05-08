import { Box, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Flex, useColorModeValue, Icon, Text } from '@chakra-ui/react';

export default function SummaryCard({ 
  title, 
  value, 
  icon, 
  type = 'neutral', 
  isLoading = false,
  comparison,
  helpText 
}) {
  // Mapear tipos para cores
  const colorMap = {
    income: 'green.500',
    expense: 'red.500',
    neutral: 'blue.500'
  };

  const color = colorMap[type];
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      p={5}
      shadow="sm"
      borderWidth="1px"
      borderRadius="lg"
      bg={cardBg}
      borderColor={borderColor}
      flex={1}
      minW="250px"
      _hover={{ 
        shadow: "md",
        transition: "all 0.3s ease"
      }}
    >
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <Text fontSize="lg" fontWeight="medium">{title}</Text>
        {icon && <Icon as={icon} boxSize={6} color={color} />}
      </Flex>

      <Stat>
        <StatNumber fontSize="2xl" color={color}>
          {isLoading ? '...' : value}
        </StatNumber>
        
        {comparison && (
          <StatHelpText>
            <StatArrow type={comparison.type} />
            {comparison.value}
          </StatHelpText>
        )}

        {helpText && (
          <StatHelpText>
            {helpText}
          </StatHelpText>
        )}
      </Stat>
    </Box>
  );
} 