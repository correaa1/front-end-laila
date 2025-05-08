import { 
  Flex, 
  IconButton, 
  Text,
  HStack,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

export default function MonthSelector({ 
  month, 
  year, 
  onPrevious, 
  onNext 
}) {
  // Array com os nomes dos meses em português
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  // Mês é baseado em 1-12, mas o array é 0-11
  const monthName = monthNames[month - 1];

  return (
    <Flex justifyContent="center" alignItems="center" mb={6}>
      <HStack>
        <IconButton
          aria-label="Mês anterior"
          icon={<ChevronLeftIcon />}
          onClick={onPrevious}
          variant="ghost"
        />
        
        <Text fontWeight="medium" fontSize="xl" px={4}>
          {monthName} de {year}
        </Text>
        
        <IconButton
          aria-label="Próximo mês"
          icon={<ChevronRightIcon />}
          onClick={onNext}
          variant="ghost"
        />
      </HStack>
    </Flex>
  );
} 