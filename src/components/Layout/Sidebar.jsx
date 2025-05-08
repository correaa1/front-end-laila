import {
  Box,
  Flex,
  VStack,
  Text,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NavItem = ({ icon, children, to, ...rest }) => {
  const activeStyle = {
    bg: useColorModeValue('brand.50', 'rgba(255, 255, 255, 0.16)'),
    color: 'brand.500',
    fontWeight: 'bold',
  };

  return (
    <NavLink
      to={to}
      style={({ isActive }) => (isActive ? activeStyle : {})}
      end
    >
      {({ isActive }) => (
        <Flex
          align="center"
          p="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: useColorModeValue('brand.50', 'rgba(255, 255, 255, 0.16)'),
            color: 'brand.500',
          }}
          fontWeight={isActive ? 'bold' : 'normal'}
          color={isActive ? 'brand.500' : useColorModeValue('gray.600', 'gray.300')}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              as={icon}
            />
          )}
          {children}
        </Flex>
      )}
    </NavLink>
  );
};

export default function Sidebar({ links }) {
  const { user } = useAuth();
  const bgColor = useColorModeValue('white', 'gray.900');

  return (
    <Box
      w={{ base: 'full', md: 60 }}
      bg={bgColor}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      pos="fixed"
      h="full"
      pt={8}
    >
      <Flex px="4" pb="8" align="center" direction="column">
        <Text fontSize="2xl" fontWeight="bold" color="brand.500">
          FinanSys
        </Text>
        {user && (
          <Text fontSize="sm" color="gray.500" mt={1}>
            Olá, {user.name}
          </Text>
        )}
      </Flex>

      <VStack spacing={1} align="stretch">
        {links.map((link) => (
          <NavItem key={link.to} icon={link.icon} to={link.to}>
            {link.label}
          </NavItem>
        ))}
      </VStack>
    </Box>
  );
} 