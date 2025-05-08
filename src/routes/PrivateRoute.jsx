import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingScreen from '../components/UI/LoadingScreen';

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen message="Verificando autenticação..." />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
} 