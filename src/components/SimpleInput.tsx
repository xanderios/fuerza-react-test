import React, { FormEvent, ReactElement } from 'react';

interface Props {
  className?: string;
  type?: string;
  placeholder?: string;
  value: string;
  maxLength?: number;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
}

export default function SimpleInput({
  className,
  type,
  placeholder,
  value,
  maxLength,
  onChange,
}: Props): ReactElement {
  return (
    <input
      className={`input ${className}`}
      type={type || 'text'}
      placeholder={placeholder}
      value={value}
      maxLength={maxLength || 200}
      onChange={onChange}
    />
  );
}
