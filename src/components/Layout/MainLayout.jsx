import { Box, useColorModeValue } from '@chakra-ui/react';
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
    <Box minH="100vh" bg={bgColor}>
      <Sidebar
        display={{ base: 'none', md: 'block' }}
        links={links}
      />
      <Box 
        ml={{ base: 0, md: 60 }}
        p={6}
        minH="100vh"
        maxW={{ base: "100%", xl: "1200px" }}
        mx="auto"
      >
        {children}
      </Box>
    </Box>
  );
} 