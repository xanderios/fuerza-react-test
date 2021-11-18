import React, { FormEvent, ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth, AuthFormData } from '../contexts/AuthContext';
import Logo from '../components/Logo';
import Input from '../components/Input';
import Button from '../components/Button';

export default function SignUp(): ReactElement {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState<AuthFormData>({
    username: '',
    password: '',
    email: '',
  });

  function handleUsernameInput(e: FormEvent<HTMLInputElement>) {
    setFormData({ ...formData, username: e.currentTarget.value });
  }

  function handlePasswordInput(e: FormEvent<HTMLInputElement>) {
    setFormData({ ...formData, password: e.currentTarget.value });
  }

  function handleEmailInput(e: FormEvent<HTMLInputElement>) {
    setFormData({ ...formData, email: e.currentTarget.value });
  }

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signUp(formData);
  }

  return (
    <div className="auth-page">
      <Logo />
      <div>
        <div className="header">
          <p className="title">Sign Up</p>
          <Link to="/login">Already have an account</Link>
        </div>
        <form onSubmit={submitHandler}>
          <Input
            type="text"
            value={formData.username}
            onChange={handleUsernameInput}
            placeholder="Define a username"
          />
          <Input
            type="text"
            value={formData.password as string}
            onChange={handlePasswordInput}
            placeholder="Set your password"
          />
          <Input
            type="text"
            value={formData.email as string}
            onChange={handleEmailInput}
            placeholder="Email (optional)"
          />
          <div className="actions">
            <Button type="submit">Create account</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
