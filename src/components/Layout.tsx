import React, { ReactElement, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props): ReactElement {
  return <div>{children}</div>;
}
