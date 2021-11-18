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
    if (formData.username.length <= 0) return;
    if (formData.username.length >= 20) return;
    if (
      formData.email &&
      formData.email.length > 0 &&
      formData.email.length < 20
    )
      return;
    if (formData.password && formData.password.length <= 0) return;

    await api.post('/auth/signup', { formData }).then((res) => {
      history.push('/login');
    });
  }

  async function signIn(formData: AuthFormData) {
    if (!formData.username || formData.username.length <= 0) return;
    if (!formData.password || formData.password.length <= 0) return;

    setIsLoading(true);
    deleteCookies();

    try {
      const response: SignInResponse = await api.post('/auth/login', {
        formData,
      });
      const { token, user: responseUser } = response;
      setUser(responseUser);
      if (token) {
        Cookies.set('token', token, { expires: 1 });
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
      }
      setIsLoading(false);
      history.push(`/journals`);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
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
