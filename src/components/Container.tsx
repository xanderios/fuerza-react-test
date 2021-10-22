import React, { ReactElement, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Container({ children }: Props): ReactElement {
  return (
    <div className="background">
      <div className="container">{children}</div>
    </div>
  );
}
