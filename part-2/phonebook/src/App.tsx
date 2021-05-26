import React, { useEffect, useState } from 'react';
import axios from 'axios';
import db from 'json-server';
import Form from './Form';
import Search from './Search';
import Numbers from './Numbers';

function App() {
  const init: Person[] = [];
  const [persons, setPersons] = useState(init);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(x => setPersons(x.data));
  }, []);
  
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
