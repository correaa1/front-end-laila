import { Navigate } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import LoadingScreen from '../components/UI/LoadingScreen';

export default function PrivateRoute({ children }) {
  const { isLoggedIn, loading } = useAuthStatus();

  if (loading) {
    return <LoadingScreen message="Verificando autenticação..." />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
} 