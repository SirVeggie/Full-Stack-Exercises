import { useHistory } from 'react-router';
import { useField } from '../hooks/useField';

export function CreateNew(props) {
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.props.value,
      author: author.props.value,
      info: info.props.value,
      votes: 0
    });

    history.push('/');
    props.notify('A new anecdote \'' + content + '\' created!');

    setTimeout(() => {
      props.notify('');
    }, 10000);
  };
  
  const reset = (event) => {
    event.preventDefault();
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content <input name='content' {...content.props} />
        </div>
        <div>
          author <input name='author' {...author.props} />
        </div>
        <div>
          url for more info <input name='info' {...info.props} />
        </div>
        <button type='submit'>create</button>
        <button onClick={reset}>reset</button>
      </form>
    </div>
  );
}