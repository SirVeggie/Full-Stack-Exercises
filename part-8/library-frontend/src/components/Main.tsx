import { useApolloClient, useQuery } from '@apollo/client';
import { useState } from 'react';
import { ME } from '../queries';
import { AllBooks } from './AllBooks';
import { Authors } from './Authors';
import { BookForm } from './BookForm';
import { RecommendedBooks } from './RecommendedBooks';

export function Main({ token, setToken }: { token: string | null, setToken: (t: string | null) => void; }) {
  const client = useApolloClient();
  const [page, setPage] = useState('authors' as 'authors' | 'books' | 'addBook' | 'recommend');
  
  const { data, loading } = useQuery(ME);
  
  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!data?.me) {
    return <div>Invalid token <button onClick={logout}>Logout</button></div>;
  }
  
  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        User: {data.me.username} <button onClick={logout}>Logout</button>
      </div>
      <div>
        <button style={{ marginRight: 10 }} onClick={() => setPage('authors')}>Authors</button>
        <button style={{ marginRight: 10 }} onClick={() => setPage('books')}>Books</button>
        <button style={{ marginRight: 10 }} onClick={() => setPage('addBook')}>Add Book</button>
        <button onClick={() => setPage('recommend')}>Recommend</button>
      </div>
      {page === 'authors' && <Authors />}
      {page === 'books' && <AllBooks />}
      {page === 'addBook' && <BookForm />}
      {page === 'recommend' && <RecommendedBooks />}
    </div>
  );
}