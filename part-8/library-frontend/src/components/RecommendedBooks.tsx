import { useQuery } from '@apollo/client';
import { ALL_BOOKS, ME } from '../queries';
import { Books } from './Books';

export function RecommendedBooks() {
  const meQuery = useQuery(ME);
  const bookQuery = useQuery(ALL_BOOKS, {
    skip: meQuery.loading || !!meQuery.error,
    variables: {
      genre: meQuery.data?.me?.favoriteGenre
    }
  });

  if (bookQuery.loading || meQuery.loading) {
    return <div>Loading...</div>;
  }

  if (bookQuery.error || meQuery.error) {
    return <div>Error: {bookQuery.error?.message || meQuery.error?.message}</div>;
  }

  return (
    <div>
      <h2>Recommended Books</h2>
      <Books books={bookQuery.data?.allBooks} />
    </div>
  );
}