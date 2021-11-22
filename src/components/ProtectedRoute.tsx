import React, { ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props): ReactElement {
  const { isLoading, isAuthenticated } = useAuth();

  return isLoading ? (
    <p>Carregando...</p>
  ) : !isLoading && isAuthenticated ? (
    <>{children}</>
  ) : (
    <div className="default-page unlogged-page container">
      <Logo />
      <div className="content">
        <p>It seems you&apos;re not logged in yet.</p>
        <Link className="btn btn--fill" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
}
