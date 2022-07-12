import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { SET_BIRTHYEAR } from '../queries';
import Select from 'react-select';

function generateOptions(names: string[]) {
  return names.map(name => ({ value: name, label: name }));
}

export function SetBirth({ names }: { names: string[]; }) {
  const [setBirth] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: ['allAuthors']
  });

  const options = generateOptions(names);
  const [name, setName] = useState(null as typeof options[number] | null);
  const [year, setYear] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isNaN(Number(year)))
      return setErrorMessage('Published year must be a number');
    if (!name?.value)
      return setErrorMessage('Name is required');

    setBirth({
      variables: {
        name: name!.value,
        born: parseInt(year)
      }
    }).then(() => {
      setName(null);
      setYear('');
      setErrorMessage('');
    }).catch(error => {
      setErrorMessage(error.message);
    });
  };

  return (
    <div>
      <h3>Set birthyear</h3>
      <div style={{ color: 'red', margin: '20px 0' }}>{errorMessage}</div>
      <form onSubmit={onSubmit}>

        <div style={{ maxWidth: 200, marginBottom: 10 }}>
          <div>Author</div>
          <Select value={name} options={options} onChange={setName} />
        </div>

        <label style={{ display: 'block', marginBottom: 10 }}>Year<br />
          <input type='text' name='year' value={year} onChange={e => setYear(e.target.value)} />
        </label>

        <button type='submit'>Update</button>
      </form>
    </div>
  );
}