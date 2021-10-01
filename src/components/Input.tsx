import React, { FormEvent, ReactElement, useEffect } from 'react';

import styles from '../styles/components/Input.module.css';

interface Props {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
}

export default function Input({
  type,
  placeholder,
  value,
  onChange,
}: Props): ReactElement {
  function isEmpty() {
    return value.length < 1;
  }

  useEffect(() => {
    console.log(isEmpty());
  }, [value]);

  return (
    <div
      className={`${styles.inputWrapper} ${
        !isEmpty() ? styles.inputWrapperNotEmpty : ''
      }`}
    >
      {placeholder && <span className={styles.placeholder}>{placeholder}</span>}
      <input type={type || 'text'} value={value} onChange={onChange} />
    </div>
  );
}
