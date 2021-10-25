import React, { FormEvent, ReactElement } from 'react';

interface Props {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
}

export default function SimpleInput({
  type,
  placeholder,
  value,
  onChange,
}: Props): ReactElement {
  return (
    <input
      className="input"
      type={type || 'text'}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
