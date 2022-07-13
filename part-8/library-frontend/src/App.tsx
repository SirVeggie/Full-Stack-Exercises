import { useEffect, useState } from 'react';
import { Auth } from './components/Auth';
import { Main } from './components/Main';

export function App() {
  const [token, setToken] = useState(null as string | null);
  
  useEffect(() => {
    const token = localStorage.getItem('library-token');
    setToken(token);
  }, []);
  
  return (
    <div className='app'>
      <h2>GraphQL Library</h2>
      {token && <Main token={token} setToken={setToken} />}
      {!token && <Auth token={token} setToken={setToken} />}
    </div>
  );
}
