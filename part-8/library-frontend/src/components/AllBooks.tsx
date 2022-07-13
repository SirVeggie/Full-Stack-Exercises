import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ALL_BOOKS } from '../queries';
import { Books } from './Books';

export function AllBooks() {
  const [genre, setGenre] = useState('');
  const [timer, setTimer] = useState(null as any);
  const { loading, error, data, refetch } = useQuery(ALL_BOOKS);

  const genres: string[] = data?.allBooks.map((b: any) => b.genres).flat().filter((g: any, i: any, a: any) => a.indexOf(g) === i);

  useEffect(() => {
    clearTimeout(timer);
    setTimer(setTimeout(() => {
      refetch({ genre });
    }, 400));
  }, [genre]); // eslint-disable-line

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Books</h2>
      <label>Filter by genre:<br />
        <input style={{ marginBottom: 10 }} type='text' value={genre} onChange={e => setGenre(e.target.value)} />
      </label>
      <div style={{ marginBottom: 20 }}>Genres: {genres.join(', ')}</div>
      <Books books={data?.allBooks} />
    </div>
  );
}