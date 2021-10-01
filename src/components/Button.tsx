import React, { FormEvent, ReactElement, ReactNode } from 'react';
import styles from '../styles/components/Button.module.css';

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
    <div className={styles.buttonWrapper}>
      <button
        className={`${styles.button} ${styles.buttonFill}`}
        onClick={onClick}
        type={type || 'button'}
      >
        {children}
      </button>
    </div>
  );
}
