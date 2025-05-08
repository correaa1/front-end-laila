import { useState } from 'react';
import {
  Button,
  Link,
  Text,
  Flex,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormControl,
  FormErrorMessage,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { successToast } from '../utils/toast';
import { EmailIcon, LockIcon, InfoIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import AuthLayout from '../components/Layout/AuthLayout';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password', '');

  const onSubmit = async (data) => {
    setLoading(true);
    setRegisterError('');
    
    try {
      const response = await registerUser(data.name, data.email, data.password);
      
      if (response.success) {
        successToast(
          'Cadastro realizado',
          'Seu cadastro foi realizado com sucesso! Agora você pode fazer login.'
        );
        navigate('/login');
      } else {
        if (response.error?.response) {
          const { status, data } = response.error.response;
          
          if (status === 400) {
            // Erros de validação
            if (Array.isArray(data.message)) {
              setRegisterError(data.message.join(', '));
            } else {
              setRegisterError(data.message || 'Dados inválidos. Verifique as informações fornecidas.');
            }
          } else if (status === 409) {
            setRegisterError('Este email já está em uso. Por favor, escolha outro.');
          } else {
            setRegisterError('Não foi possível realizar o cadastro. Tente novamente.');
          }
        } else {
          setRegisterError('Não foi possível realizar o cadastro. Tente novamente.');
        }
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      setRegisterError('Ocorreu um erro ao tentar realizar o cadastro. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const inputStyles = {
    bg: 'blue.50',
    borderColor: 'gray.300',
    borderRadius: 'md',
    _placeholder: { color: 'gray.500' },
    _focus: { 
      borderColor: 'teal.400',
      boxShadow: '0 0 0 1px teal.400',
    },
  };

  return (
    <AuthLayout 
      title="Cadastre-se" 
      subtitle="Crie sua conta para gerenciar suas finanças"
    >
      {registerError && (
        <Alert status="error" mb={4} borderRadius="md">
          <AlertIcon />
          {registerError}
        </Alert>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <VStack spacing={4} w="full">
          <FormControl isInvalid={!!errors.name}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.500">
                <InfoIcon />
              </InputLeftElement>
              <Input
                id="name"
                placeholder="Nome completo"
                size="md"
                height="45px"
                bg="blue.50"
                sx={inputStyles}
                {...register('name', {
                  required: 'Nome é obrigatório',
                  minLength: {
                    value: 3,
                    message: 'O nome deve ter pelo menos 3 caracteres',
                  },
                })}
              />
            </InputGroup>
            {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
          </FormControl>

          <FormControl isInvalid={!!errors.email}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.500">
                <EmailIcon />
              </InputLeftElement>
              <Input
                id="email"
                placeholder="Email"
                type="email"
                size="md"
                height="45px"
                bg="blue.50"
                sx={inputStyles}
                {...register('email', {
                  required: 'Email é obrigatório',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Formato de email inválido',
                  },
                })}
              />
            </InputGroup>
            {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.500">
                <LockIcon />
              </InputLeftElement>
              <Input
                id="password"
                placeholder="Senha"
                type={showPassword ? 'text' : 'password'}
                size="md"
                height="45px"
                bg="blue.50"
                sx={inputStyles}
                {...register('password', {
                  required: 'Senha é obrigatória',
                  minLength: {
                    value: 6,
                    message: 'A senha deve ter pelo menos 6 caracteres',
                  },
                })}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={toggleShowPassword} variant="ghost">
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
          </FormControl>

          <FormControl isInvalid={!!errors.passwordConfirmation}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.500">
                <LockIcon />
              </InputLeftElement>
              <Input
                id="passwordConfirmation"
                placeholder="Confirme sua senha"
                type={showConfirmPassword ? 'text' : 'password'}
                size="md"
                height="45px"
                bg="blue.50"
                sx={inputStyles}
                {...register('passwordConfirmation', {
                  required: 'Confirmação de senha é obrigatória',
                  validate: value => value === password || 'As senhas não coincidem',
                })}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={toggleShowConfirmPassword} variant="ghost">
                  {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.passwordConfirmation && <FormErrorMessage>{errors.passwordConfirmation.message}</FormErrorMessage>}
          </FormControl>

          <Button
            type="submit"
            bg="teal.500"
            color="white"
            width="full"
            mt={4}
            height="45px"
            fontWeight="medium"
            isLoading={loading}
            loadingText="Cadastrando..."
            _hover={{ bg: 'teal.600' }}
          >
            Cadastrar
          </Button>
        </VStack>
      </form>

      <Flex w="full" justify="center" mt={6}>
        <Text mr={1}>Já tem uma conta?</Text>
        <Link as={RouterLink} to="/login" color="teal.500" fontWeight="medium" textDecoration="none">
          Faça login
        </Link>
      </Flex>
    </AuthLayout>
  );
} 