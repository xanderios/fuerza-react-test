import React, { FormEvent, ReactElement, ReactNode } from 'react';

interface Props {
  type?: 'button' | 'reset' | 'submit';
  children: ReactNode;
  onClick?: (e: FormEvent<HTMLButtonElement>) => void;
}

export default function Button({
  type,
  children,
  onClick,
}: Props): ReactElement {
  return (
    <div className="btn">
      <button
        className="btn btn--fill"
        onClick={onClick}
        type={type || 'button'}
      >
        {children}
      </button>
    </div>
  );
}
