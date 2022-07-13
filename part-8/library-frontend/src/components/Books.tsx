import { IBook } from '../types';

export function Books({ books }: { books: IBook[] }) {
  return (
    <div>
      {books.map((book: IBook) => (
        <div key={book.id} style={{ marginBottom: 15 }}>
          <span style={{ fontWeight: 'bold' }}>{book.title} - {book.published}</span>
          <div>by: {(book.author as any).name}</div>
        </div>
      ))}
    </div>
  );
}