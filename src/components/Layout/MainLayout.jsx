import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
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

  const bgColor = useColorModeValue('gray.50', 'gray.800');

  return (
    <Flex width="100vw" height="100vh" position="fixed" top="0" left="0">
      {/* Sidebar fixa */}
      <Box
        width="240px"
        height="100%"
        display={{ base: 'none', md: 'block' }}
        flexShrink={0}
      >
        <Sidebar links={links} />
      </Box>

      {/* Área de conteúdo principal */}
      <Box
        flex="1"
        bg={bgColor}
        height="100%"
        p={6}
        overflowY="auto"
      >
        {children}
      </Box>
    </Flex>
  );
} 