import { useState } from 'react';
import { Login } from './Login';
import { UserForm } from './UserForm';

export function Auth({ token, setToken }: { token: string | null, setToken: (t: string | null) => void; }) {
  const [page, setPage] = useState('login' as 'login' | 'register');
  
  return (
    <div>
      <div>
        <button style={{ marginRight: 10 }} onClick={() => setPage('login')}>Login</button>
        <button onClick={() => setPage('register')}>Register</button>
      </div>
      
      {page === 'login' && <Login setToken={setToken} />}
      {page === 'register' && <UserForm setPage={setPage} />}
    </div>
  );
}