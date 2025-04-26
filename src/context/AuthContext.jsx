import { createContext, useContext, useState, useEffect, startTransition } from 'react';
import authService from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const validateAndRefreshToken = async () => {
    try {
      const isValid = await authService.validateToken();
      if (!isValid) {
        // If token is invalid, try to generate a new one
        await authService.generateToken();
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      setIsAuthenticated(false);
      console.error('Token validation/refresh failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    validateAndRefreshToken();
  }, []);

  const generateToken = async () => {
    try {
      setIsLoading(true);
      await authService.generateToken();
      startTransition(() => {
        setIsAuthenticated(true);
      });
      return true;
    } catch (error) {
      setIsAuthenticated(false);
      console.error('Token generation failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    isAuthenticated,
    isLoading,
    generateToken,
    validateAndRefreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
