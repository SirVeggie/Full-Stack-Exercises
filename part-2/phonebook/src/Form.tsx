import React, { useState } from 'react';

function Form({ update, persons }: { persons: Person[], update: (value: Person) => void; }) {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const submit = (event: any) => {
    event.preventDefault();
    const person: Person = { name: newName, number: newNumber };
    if (checkValidity(person, persons))
      update(person);
    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td><input value={newName} onChange={event => setNewName(event.target.value)} /></td>
            </tr>
            <tr>
              <td>Number</td>
              <td><input value={newNumber} onChange={event => setNewNumber(event.target.value)} /></td>
            </tr>
            <tr>
              <td></td>
              <td align='right'><button type='submit'>Add</button></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

function checkValidity(p: Person, persons: Person[]) {
  if (p.name === '' || p.number === '') {
    window.alert('Blanks are not allowed');
    return false;
  }

  if (persons.find(x => x.name === p.name)) {
    window.alert(`Name '${p.name}' already exists in the phonebook`);
    return false;
  }

  if (persons.find(x => x.number === p.number)) {
    window.alert(`Number '${p.number}' already exists in the phonebook`);
    return false;
  }

  return true;
};

export default Form;