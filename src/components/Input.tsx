import React, { FormEvent, ReactElement } from 'react';

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

  return (
    <div className={`input ${!isEmpty() ? 'input--not-empty' : ''}`}>
      {placeholder && <span className="placeholder">{placeholder}</span>}
      <input type={type || 'text'} value={value} onChange={onChange} />
    </div>
  );
}
