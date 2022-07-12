import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';
import { IBook } from '../types';

export function Books() {
  const { loading, error, data } = useQuery(ALL_BOOKS);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Books</h2>
      {data.allBooks.map((book: IBook) => (
        <div key={book.id} style={{ marginBottom: 15 }}>
          <span style={{ fontWeight: 'bold' }}>{book.title} - {book.published}</span>
          <div>by: {(book.author as any).name}</div>
        </div>
      ))}
    </div>
  );
}