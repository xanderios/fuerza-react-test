import React, { FormEvent, ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../interfaces/user.interface';
import api from '../services/api';

import styles from '../styles/pages/Auth.module.css';
import logo from '../assets/logo.svg';

import Input from '../components/Input';
import Button from '../components/Button';

interface Props {}

export default function SignUp({}: Props): ReactElement {
  const [formData, setFormData] = useState<User>({
    username: '',
    email: '',
    journalIds: [],
    password: '',
  });

  async function signUp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formData.username.length <= 0) return;
    if (formData.username.length >= 20) return;
    if (formData.password && formData.password.length <= 0) return;

    const response = await api.post('/auth/signup', formData);

    console.log(response);
  }

  function handleUsernameInput(e: FormEvent<HTMLInputElement>) {
    setFormData({ ...formData, username: e.currentTarget.value });
  }

  function handlePasswordInput(e: FormEvent<HTMLInputElement>) {
    setFormData({ ...formData, password: e.currentTarget.value });
  }

  function handleEmailInput(e: FormEvent<HTMLInputElement>) {
    setFormData({ ...formData, email: e.currentTarget.value });
  }

  return (
    <div className={styles.authPageWrapper}>
      <img className={styles.logo} src={logo} alt="Nocturnal" />
      <div>
        <div className={styles.header}>
          <p className={styles.title}>Sign Up</p>
          <Link to="/signin">Already have an account</Link>
        </div>
        <form onSubmit={signUp}>
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
          <div className={styles.button}>
            <Button type="submit">Create account</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
