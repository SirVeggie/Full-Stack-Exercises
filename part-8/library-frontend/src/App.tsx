import { useState } from 'react';
import { Authors } from './components/Authors';
import { BookForm } from './components/BookForm';
import { Books } from './components/Books';

export function App() {
  const [page, setPage] = useState('authors' as 'authors' | 'books' | 'addBook');
  
  return (
    <div className='app'>
      <h2>GraphQL Library</h2>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        <button onClick={() => setPage('addBook')}>Add Book</button>
      </div>
      {page === 'authors' && <Authors />}
      {page === 'books' && <Books />}
      {page === 'addBook' && <BookForm />}
    </div>
  );
}
