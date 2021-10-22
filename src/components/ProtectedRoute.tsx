import React, { ReactElement, ReactNode } from 'react';

import { useAuth } from '../contexts/AuthContext';

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
    <p>Parece que você não está logado</p>
  );
}
