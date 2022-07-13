import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { LOGIN } from '../queries';

type LoginProps = {
  setToken: (token: string | null) => void;
};

export function Login(p: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [loginQuery] = useMutation(LOGIN, {
    refetchQueries: ['me'],
    onError: (error) => {
      setError(error.message);
    },
    onCompleted: (data) => {
      if (data?.login?.value) {
        p.setToken(data.login.value);
        localStorage.setItem('library-token', data.login.value);
      }
    }
  });

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginQuery({
      variables: {
        username,
        password
      }
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <div style={{ color: 'red', margin: '20px 0' }}>{error}</div>
      <form onSubmit={login}>

        <label style={{ display: 'block', marginBottom: 10 }}>Username<br />
          <input type='text' name='username' value={username} onChange={e => setUsername(e.target.value)} />
        </label>

        <label style={{ display: 'block', marginBottom: 10 }}>Password<br />
          <input type='password' name='password' value={password} onChange={e => setPassword(e.target.value)} />
        </label>

        <button type='submit'>Login</button>
      </form>
    </div>
  );
}