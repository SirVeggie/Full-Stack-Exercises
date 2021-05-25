import React, { useState } from 'react';
import Form from './Form';
import Search from './Search';
import Numbers from './Numbers';

function App() {
  const init: Person[] = [
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ];
  
  const [persons, setPersons] = useState(init);
  const [search, setSearch] = useState('');

  return (
    <div>
      <h2>Phonebook</h2>
      <Search update={x => setSearch(x)} />
      <h3>Add a new number</h3>
      <Form update={x => setPersons([...persons, x])} persons={persons} />
      <h3>Numbers</h3>
      <Numbers numbers={persons} search={search} />
    </div>
  );
}

export default App;
