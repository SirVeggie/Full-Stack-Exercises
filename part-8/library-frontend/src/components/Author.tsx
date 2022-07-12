import { IAuthor } from '../types';

export function Author({ author, onClose }: { author: IAuthor, onClose: () => void }) {
  return (
    <div>
      <h3>{author.name}<div style={{ opacity: 0.3, fontSize: '0.8em' }}>{author.id}</div></h3>
      <p>This writer was born in {author.born ?? '(unknown)'} and has {(author as any).bookCount} books listed in the library</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}