import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { CREATE_USER } from '../queries';

export function UserForm({ setPage }: { setPage: (t: 'login' | 'register') => void; }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [favoriteGenre, setFavoriteGenre] = useState('');

  const [error, setError] = useState('');

  const [createUser] = useMutation(CREATE_USER, {
    onError: (error) => {
      setError(error.message);
    },
    onCompleted: (data) => {
      setUsername('');
      setPassword('');
      setFavoriteGenre('');
      setError('');
      setPage('login');
    }
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createUser({
      variables: {
        username,
        password,
        favoriteGenre
      }
    });
  };

  return (
    <div>
      <h2>Register</h2>
      <div style={{ color: 'red', margin: '20px 0' }}>{error}</div>
      <form onSubmit={onSubmit}>

        <label style={{ display: 'block', marginBottom: 10 }}>Username<br />
          <input type='text' name='username' value={username} onChange={e => setUsername(e.target.value)} />
        </label>

        <label style={{ display: 'block', marginBottom: 10 }}>Password<br />
          <input type='password' name='password' value={password} onChange={e => setPassword(e.target.value)} />
        </label>

        <label style={{ display: 'block', marginBottom: 10 }}>Favorite Genre<br />
          <input type='text' name='favoriteGenre' value={favoriteGenre} onChange={e => setFavoriteGenre(e.target.value)} />
        </label>

        <button type='submit'>Register</button>
      </form>
    </div>
  );
}