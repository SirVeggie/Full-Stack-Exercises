import React, { useState } from 'react';

function Search({ update }: { update: (s: string) => void; }) {
  const [value, setValue] = useState('');
  const submit = (event: any) => {
    event.preventDefault();
    update(value);
    setValue('');
  };
  
  return (
    <div>
      <form onSubmit={submit}>
        Search by name <input value={value} onChange={event => setValue(event.target.value)} />
        <button type='submit'>Search</button>
      </form>
    </div>
  );
}

export default Search;