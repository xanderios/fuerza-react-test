import React, { FormEvent, ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthFormData, useAuth } from '../contexts/AuthContext';

import Logo from '../components/Logo';
import Button from '../components/Button';
import Input from '../components/Input';
import Modal from '../components/Modal';

export default function Login(): ReactElement {
  const { signIn, modalError, changeError } = useAuth();
  const [formData, setFormData] = useState<AuthFormData>({
    username: '',
    password: '',
  });

  function handleUsernameInput(e: FormEvent<HTMLInputElement>) {
    setFormData({ ...formData, username: e.currentTarget.value });
    changeError(null);
  }

  function handlePasswordInput(e: FormEvent<HTMLInputElement>) {
    setFormData({ ...formData, password: e.currentTarget.value });
    changeError(null);
  }

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signIn(formData);
  }

  return (
    <div className="auth-page">
      <Modal message={modalError} changeMessage={changeError} />
      <Logo />
      <div className="content">
        <div className="header">
          <p className="title">Sign in</p>
          <Link to="/signup">Sign Up</Link>
        </div>
        <form onSubmit={submitHandler}>
          <Input
            type="text"
            value={formData.username}
            onChange={handleUsernameInput}
            placeholder="Your username"
          />
          <Input
            type="password"
            value={formData.password as string}
            onChange={handlePasswordInput}
            placeholder="Your password"
          />
          <a
            className="forgot-password"
            href="https://pt.wikipedia.org/wiki/HTTP_404"
          >
            Forgot Password?
          </a>
          <div className="actions">
            <Button type="submit">Log In</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
