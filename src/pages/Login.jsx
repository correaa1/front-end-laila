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
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { errorToast } from '../utils/toast';
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import AuthLayout from '../components/Layout/AuthLayout';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const success = await login(data.email, data.password);
      if (success) {
        navigate('/dashboard');
      } else {
        errorToast(
          'Erro de autenticação',
          'Email ou senha incorretos. Por favor, tente novamente.'
        );
      }
    } catch (error) {
      errorToast(
        'Erro no login',
        'Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.'
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

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
      title="Welcome" 
      subtitle=""
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <VStack spacing={4} w="full">
          <FormControl isInvalid={!!errors.email}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.500">
                <EmailIcon />
              </InputLeftElement>
              <Input
                id="email"
                placeholder="email address"
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
                placeholder="Password"
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

          <Flex w="full" justifyContent="flex-end">
            <Link color="teal.500" fontSize="sm" textDecoration="none">
              Esqueceu a senha?
            </Link>
          </Flex>

          <Button
            type="submit"
            bg="teal.500"
            color="white"
            width="full"
            mt={4}
            height="45px"
            fontWeight="medium"
            isLoading={loading}
            loadingText="Entrando..."
            _hover={{ bg: 'teal.600' }}
          >
            Login
          </Button>
        </VStack>
      </form>

      <Flex w="full" justify="center" mt={6}>
        <Text mr={1}>Novo por aqui?</Text>
        <Link as={RouterLink} to="/register" color="teal.500" fontWeight="medium" textDecoration="none">
          Cadastre-se
        </Link>
      </Flex>
    </AuthLayout>
  );
} 