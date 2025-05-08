import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export function useAuthStatus() {
  const { user, loading: authLoading } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      setIsLoggedIn(!!user);
      setLoading(false);
    }
  }, [user, authLoading]);

  return { isLoggedIn, loading, user };
} 