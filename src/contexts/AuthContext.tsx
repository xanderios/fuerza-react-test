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
  modalError: null | string;
  changeError: (value: null | string) => void;
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
  const [modalError, setModalError] = useState<null | string>(null);
  const history = useHistory();

  useEffect(() => {
    changeError(null);
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
      changeError('Username is required');
      return;
    }
    if (formData.password === '') {
      changeError('Password is required');
      return;
    }
    if (formData.username.length < 2) {
      changeError(
        'Username is required and must have at least 2 characters length'
      );
      return;
    }
    if (formData.username.length >= 20) {
      changeError('Username must have 20 characters or less');
      return;
    }
    if (formData.password.length < 3) {
      changeError('Password must have at least 3 characters length');
      return;
    }
    if (formData.password.length > 20) {
      changeError('Password must have 4 characters or less');
      return;
    }
    if (
      formData.email &&
      formData.email.length > 8 &&
      formData.email.length < 40
    ) {
      changeError('Email must have 40 characters or less');
      return;
    }

    changeError(null);
    await api
      .post('/auth/signup', formData)
      .then(() => {
        changeError(null);
        history.push('/login');
      })
      .catch((err) => {
        changeError('An error ocurred. Please try again');
        console.log(err);
      });
  }

  async function signIn(formData: AuthFormData) {
    if (formData.username.length <= 0) {
      changeError('Username is required');
      return;
    }
    if (formData.password.length <= 0) {
      changeError('Password is required');
      return;
    }

    changeError(null);
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
      changeError(null);
      history.push(`/journals`);
    } catch (err) {
      setIsLoading(false);
      changeError('Invalid username or password, please try again');
      return;
    }
  }

  function signOut() {
    deleteCookies();
    setIsAuthenticated(false);
    history.push('/login');
  }

  function changeError(value: null | string) {
    setModalError(value);
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
        modalError,
        changeError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
