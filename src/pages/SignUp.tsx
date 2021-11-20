import React, { FormEvent, ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth, AuthFormData } from '../contexts/AuthContext';
import Logo from '../components/Logo';
import Input from '../components/Input';
import Button from '../components/Button';
import Modal from '../components/Modal';

export default function SignUp(): ReactElement {
  const { signUp, modalError, changeError } = useAuth();
  const [formData, setFormData] = useState<AuthFormData>({
    username: '',
    password: '',
    email: '',
  });

  function handleUsernameInput(e: FormEvent<HTMLInputElement>) {
    setFormData({ ...formData, username: e.currentTarget.value });
    changeError(null);
  }

  function handlePasswordInput(e: FormEvent<HTMLInputElement>) {
    setFormData({ ...formData, password: e.currentTarget.value });
    changeError(null);
  }

  function handleEmailInput(e: FormEvent<HTMLInputElement>) {
    setFormData({ ...formData, email: e.currentTarget.value });
    changeError(null);
  }

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signUp(formData);
  }

  return (
    <div className="auth-page">
      <Modal message={modalError} changeMessage={changeError} />
      <Logo />
      <div className="content">
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
            type="password"
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
