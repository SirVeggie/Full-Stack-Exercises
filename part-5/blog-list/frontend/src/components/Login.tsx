import React, { useState } from 'react';
import { login } from '../services/auth';
import { useLogin } from '../tools/LoginContext';
import { useNotification } from '../tools/NotificationContext';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setNotification } = useNotification();
  const { setUser } = useLogin();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login(username, password).then(x => {
      setUser(x.username, x.token);
      setUsername('');
      setPassword('');
      setNotification(`Logged in as ${x.username}`, 'success');
    }).catch(error => {
      setPassword('');
      setNotification(error.response.data.error, 'error');
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input id='username' value={username} onChange={e => setUsername(e.target.value ?? '')} />
        <input id='password' value={password} onChange={e => setPassword(e.target.value ?? '')} type='password' />
        <button id='login-button' type='submit'>Login</button>
      </form>
    </div>
  );
}