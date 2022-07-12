import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { FIND_AUTHOR, ALL_AUTHORS } from '../queries';
import { IAuthor } from '../types';
import { Author } from './Author';
import { SetBirth } from './SetBirth';

export function Authors() {
  const authors = useQuery(ALL_AUTHORS);
  const [searchName, setSearchName] = useState(null as string | null);
  const result = useQuery(FIND_AUTHOR, {
    variables: { name: searchName },
    skip: !searchName,
    onError: (error) => {
      console.log(error.message);
    }
  });

  if (authors.loading) {
    return <div>Loading...</div>;
  }

  if (searchName && result.data) {
    return (
      <Author
        author={result.data.findAuthor}
        onClose={() => setSearchName(null)}
      />
    );
  }

  return (
    <div className='authors'>
      <h2>Authors</h2>
      {authors.data.allAuthors.map((author: IAuthor) => (
        <div key={author.id}>
          <span>{author.name}</span>
          <button style={{ marginLeft: 10 }} onClick={() => setSearchName(author.name)}>Show</button>
        </div>
      ))}
      <SetBirth names={authors.data.allAuthors.map((x: IAuthor) => x.name)} />
    </div>
  );
}