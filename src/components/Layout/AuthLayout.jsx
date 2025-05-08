import {
  Box,
  Flex,
  useColorModeValue,
  Text,
  Heading,
  Link,
  Icon,
  Avatar,
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function AuthLayout({ children, title, subtitle, showBackLink = false, showAvatar = true }) {
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.900')}
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
    >
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        w="350px"
        maxW="90%"
        m="auto"
        position="relative"
      >
        {showBackLink && (
          <Flex mb={4}>
            <Link as={RouterLink} to="/" color="brand.500" fontWeight="medium" display="flex" alignItems="center">
              <Icon as={ChevronLeftIcon} mr={1} /> Voltar para o início
            </Link>
          </Flex>
        )}

        <Box
          bg={useColorModeValue('white', 'gray.800')}
          p={{ base: 6, md: 7 }}
          pt={{ base: 6, md: 8 }}
          pb={{ base: 8, md: 10 }}
          rounded="md"
          shadow="md"
          borderWidth={1}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          textAlign="center"
        >
          {showAvatar && (
            <Flex justify="center" mb={6}>
              <Avatar 
                size="lg" 
                bg="teal.500" 
                color="white"
              />
            </Flex>
          )}
          
          {title && (
            <Box mb={6}>
              <Heading size="lg" mb={2} color="teal.500">
                {title}
              </Heading>
              {subtitle && (
                <Text color={useColorModeValue('gray.600', 'gray.400')}>
                  {subtitle}
                </Text>
              )}
            </Box>
          )}
          {children}
        </Box>
      </MotionBox>
    </Flex>
  );
} 