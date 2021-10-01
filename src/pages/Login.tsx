import React, { FormEvent, ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import api from '../services/api';

import styles from '../styles/pages/Auth.module.css';
import logo from '../assets/logo.svg';

interface Props {}

export default function Login({}: Props): ReactElement {
  const [formData, setFormData] = useState({ username: '', password: '' });

  function signIn() {
    const { username, password } = formData;
    if (!username || username.length <= 0) return;
    if (!password || password.length <= 0) return;

    api.post('/auth/login', {
      username: username,
      password: password,
    });
  }

  function handleUsernameInput(e: FormEvent<HTMLInputElement>) {
    setFormData({ ...formData, username: e.currentTarget.value });
  }

  function handlePasswordInput(e: FormEvent<HTMLInputElement>) {
    setFormData({ ...formData, password: e.currentTarget.value });
  }

  return (
    <div className={styles.authPageWrapper}>
      <img className={styles.logo} src={logo} alt="Nocturnal" />
      <div className={styles.header}>
        <p className={styles.title}>Sign in</p>
        <Link to="/signup">Sign Up</Link>
      </div>
      <form onSubmit={signIn}>
        <Input
          type="text"
          value={formData.username}
          onChange={handleUsernameInput}
          placeholder="Your username"
        />
        <Input
          type="text"
          value={formData.password as string}
          onChange={handlePasswordInput}
          placeholder="Your password"
        />
        <a
          className={styles.forgotPassword}
          href="https://cdn.dribbble.com/users/380990/screenshots/9991737/media/428678431d8be8096bdb9a3c3c7c7dfa.mp4"
        >
          Forgot Password?
        </a>
        <div className={styles.button}>
          <Button type="submit">Log In</Button>
        </div>
      </form>
    </div>
  );
}
