import { Box, Flex, useDisclosure, IconButton, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { 
  DashboardIcon, 
  TransactionIcon, 
  CategoryIcon, 
  LogoutIcon 
} from './AppIcons';
import { useAuth } from '../../context/AuthContext';

export default function MainLayout({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const links = [
    { label: 'Dashboard', icon: DashboardIcon, to: '/dashboard' },
    { label: 'Lançamentos', icon: TransactionIcon, to: '/transactions' },
    { label: 'Categorias', icon: CategoryIcon, to: '/categories' },
    { 
      label: 'Sair', 
      icon: LogoutIcon, 
      to: '#', 
      onClick: handleLogout 
    },
  ];

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Sidebar
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
        links={links}
      />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
} 