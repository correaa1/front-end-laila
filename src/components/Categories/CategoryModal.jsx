import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  FormErrorMessage,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export default function CategoryModal({
  isOpen,
  onClose,
  onSave,
  category = null,
}) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (isOpen) {
      reset(category || { name: '', description: '', type: 'expense' });
    }
  }, [isOpen, category, reset]);

  const onSubmit = (data) => {
    onSave(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            {category ? 'Editar Categoria' : 'Nova Categoria'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl isInvalid={errors.name}>
                <FormLabel>Nome</FormLabel>
                <Input
                  id="name"
                  placeholder="Nome da categoria"
                  {...register('name', {
                    required: 'Nome é obrigatório',
                    minLength: { value: 2, message: 'Mínimo de 2 caracteres' },
                  })}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel>Descrição</FormLabel>
                <Textarea
                  id="description"
                  placeholder="Descrição da categoria"
                  {...register('description')}
                />
              </FormControl>

              <FormControl isInvalid={errors.type}>
                <FormLabel>Tipo</FormLabel>
                <Select
                  id="type"
                  placeholder="Selecione o tipo"
                  {...register('type', {
                    required: 'Tipo é obrigatório',
                  })}
                >
                  <option value="expense">Despesa</option>
                  <option value="income">Receita</option>
                </Select>
                <FormErrorMessage>
                  {errors.type && errors.type.message}
                </FormErrorMessage>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme="teal"
              type="submit"
              isLoading={isSubmitting}
            >
              Salvar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
} 