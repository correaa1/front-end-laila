import { useState } from 'react';
import {
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Textarea,
  Button,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  HStack,
  Text,
  Flex,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

export default function TransactionForm({
  transaction = null,
  categories = [],
  onSubmit,
  isLoading = false,
}) {
  const isEditing = !!transaction;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: isEditing
      ? {
          description: transaction.description,
          amount: transaction.amount,
          date: transaction.date ? new Date(transaction.date).toISOString().split('T')[0] : '',
          categoryId: transaction.categoryId,
          type: transaction.type,
          notes: transaction.notes || '',
        }
      : {
          type: 'expense', // Default to expense
          date: new Date().toISOString().split('T')[0], // Today's date
        },
  });

  const transactionType = watch('type');

  const onFormSubmit = (data) => {
    // Convert amount to number and prepare data for the adapter
    const formattedData = {
      ...data,
      amount: parseFloat(data.amount),
    };
    
    onSubmit(formattedData, isEditing);
  };

  const handleTypeChange = (value) => {
    setValue('type', value);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Stack spacing={4}>
        <FormControl isInvalid={!!errors.description}>
          <FormLabel>Descrição</FormLabel>
          <Input
            {...register('description', {
              required: 'Descrição é obrigatória',
              minLength: {
                value: 3,
                message: 'A descrição deve ter no mínimo 3 caracteres',
              },
            })}
            placeholder="Ex: Conta de luz"
          />
          {errors.description && (
            <FormErrorMessage>{errors.description.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.amount}>
          <FormLabel>Valor</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" color="gray.500">
              R$
            </InputLeftElement>
            <Input
              {...register('amount', {
                required: 'Valor é obrigatório',
                pattern: {
                  value: /^[0-9]+(\.[0-9]{1,2})?$/,
                  message: 'Valor inválido. Use apenas números e ponto para decimais.',
                },
                validate: {
                  positive: (value) => parseFloat(value) > 0 || 'O valor deve ser maior que zero',
                },
              })}
              placeholder="0.00"
              type="number"
              step="0.01"
            />
          </InputGroup>
          {errors.amount && (
            <FormErrorMessage>{errors.amount.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.date}>
          <FormLabel>Data</FormLabel>
          <Input
            {...register('date', {
              required: 'Data é obrigatória',
            })}
            type="date"
          />
          {errors.date && (
            <FormErrorMessage>{errors.date.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.type}>
          <FormLabel>Tipo</FormLabel>
          <RadioGroup
            value={transactionType}
            onChange={handleTypeChange}
          >
            <HStack spacing={5}>
              <Radio
                {...register('type', { required: 'Selecione o tipo' })}
                value="expense"
                colorScheme="red"
              >
                Despesa
              </Radio>
              <Radio
                {...register('type', { required: 'Selecione o tipo' })}
                value="income"
                colorScheme="green"
              >
                Receita
              </Radio>
            </HStack>
          </RadioGroup>
          {errors.type && (
            <FormErrorMessage>{errors.type.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.categoryId}>
          <FormLabel>Categoria</FormLabel>
          <Select
            {...register('categoryId', {
              required: 'Categoria é obrigatória',
            })}
            placeholder="Selecione uma categoria"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
          {errors.categoryId && (
            <FormErrorMessage>{errors.categoryId.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl>
          <FormLabel>Observações (opcional)</FormLabel>
          <Textarea
            {...register('notes')}
            placeholder="Detalhes adicionais sobre esta transação"
            resize="vertical"
          />
        </FormControl>

        <Flex justifyContent="flex-end" pt={4}>
          <Button
            type="submit"
            colorScheme="teal"
            isLoading={isLoading}
            loadingText={isEditing ? "Salvando..." : "Adicionando..."}
          >
            {isEditing ? "Salvar alterações" : "Adicionar transação"}
          </Button>
        </Flex>
      </Stack>
    </form>
  );
} 