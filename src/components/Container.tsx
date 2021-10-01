import React, { ReactElement, ReactNode } from 'react';

import styles from '../styles/components/Container.module.css';

interface Props {
  children: ReactNode;
}

export default function Container({ children }: Props): ReactElement {
  return (
    <div className={styles.background}>
      <div className={styles.container}>{children}</div>
    </div>
  );
}
