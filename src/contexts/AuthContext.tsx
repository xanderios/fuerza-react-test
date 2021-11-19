import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router';
import { AxiosInstance } from 'axios';

import api from '../services/api';
import { IUser } from '../types/user';

export type AuthFormData = {
  username: string;
  password: string;
  email?: string;
};

export type SignInResponse = {
  token: string;
  user: IUser;
};

interface authContextData {
  isLoading: boolean;
  isAuthenticated: boolean;
  signUp: (formData: AuthFormData) => void;
  signIn: (formData: AuthFormData) => void;
  user: IUser | null;
  signOut: () => void;
  withSessionAPI: () => AxiosInstance;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as authContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Disable for Auth development
  const [user, setUser] = useState<IUser | null>(null);
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    function loadUserFromCookies() {
      const token = Cookies.get('access_token');
      if (token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
      }
      setIsLoading(false);
    }
    loadUserFromCookies();
  }, []);

  function deleteCookies() {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    delete api.defaults.headers['Authorization'];
  }

  const withSessionAPI = () => {
    const token = Cookies.get('access_token');
    if (token) {
      api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
    return api;
  };

  async function signUp(formData: AuthFormData) {
    if (formData.username === '') {
      alert('Username is required');
      return;
    }
    if (formData.password === '') {
      alert('Password is required');
      return;
    }
    if (formData.username.length < 2) {
      alert('Username is required and must be at least 2 characters long');
      return;
    }
    if (formData.username.length >= 20) {
      alert('Username must be shorter than 21 characters');
      return;
    }
    if (formData.password.length < 3) {
      alert('Password must be at least 3 characters long');
      return;
    }
    if (formData.password.length > 20) {
      alert('Password must be shorter than 4 characters long');
      return;
    }
    if (
      formData.email &&
      formData.email.length > 8 &&
      formData.email.length < 40
    ) {
      alert('Email must be shorter than 40 characters');
      return;
    }

    await api
      .post('/auth/signup', formData)
      .then(() => {
        history.push('/login');
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  async function signIn(formData: AuthFormData) {
    if (formData.username.length <= 0) {
      alert('Username is required');
      return;
    }
    if (formData.password.length <= 0) {
      alert('Password is required');
      return;
    }

    setIsLoading(true);
    deleteCookies();

    try {
      const response: SignInResponse = await api.post('/auth/login', formData);
      const { token, user: responseUser } = response;
      setUser(responseUser);
      if (token) {
        Cookies.set('token', token, { expires: 1 });
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
      }
      setIsLoading(false);
      history.push(`/journals`);
    } catch (err) {
      setIsLoading(false);
      alert('Invalid username or password, please try again');
      return;
    }
  }

  function signOut() {
    deleteCookies();
    setIsAuthenticated(false);
    history.push('/login');
  }

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        signUp,
        signIn,
        user,
        signOut,
        withSessionAPI,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
