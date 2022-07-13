import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { ADD_BOOK } from '../queries';

export function BookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genres, setGenres] = useState([] as string[]);

  const [errorMessage, setErrorMessage] = useState('');

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: ['allBooks', 'allAuthors'],
    onError: (error) => {
      setErrorMessage(error.message);
    },
    onCompleted: (data) => {
      setTitle('');
      setAuthor('');
      setPublished('');
      setGenres([]);
      setErrorMessage('');
    }
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isNaN(parseInt(published)))
      return setErrorMessage('Published year must be a number');

    addBook({
      variables: {
        title,
        author,
        published: parseInt(published),
        genres
      }
    });
  };

  return (
    <div>
      <h2>Add a book</h2>
      <div style={{ color: 'red', margin: '20px 0' }}>{errorMessage}</div>
      <form onSubmit={onSubmit}>

        <label style={{ display: 'block', marginBottom: 10 }}>Title<br />
          <input type='text' name='title' value={title} onChange={e => setTitle(e.target.value)} />
        </label>

        <label style={{ display: 'block', marginBottom: 10 }}>Author<br />
          <input type='text' name='author' value={author} onChange={e => setAuthor(e.target.value)} />
        </label>

        <label style={{ display: 'block', marginBottom: 10 }}>Published<br />
          <input type='text' name='published' value={published} onChange={e => setPublished(e.target.value)} />
        </label>

        <label style={{ display: 'block', marginBottom: 10 }}>Genres<br />
          <input type='text' name='genres' value={genres} onChange={e => setGenres(e.target.value.split(/,? |, ?/))} />
        </label>

        <button type='submit'>Create book</button>
      </form>
    </div>
  );
}