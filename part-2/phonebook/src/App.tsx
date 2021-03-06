import React, { useEffect, useState } from 'react';
import Form from './Form';
import Search from './Search';
import Numbers from './Numbers';
import Server from './Server';
import Notification from './Notification';

const alertTimeout = 5000;

function App() {
  const init: Person[] = [];
  const defaultError: Alert = { type: 'success', msg: '' };
  const [persons, setPersons] = useState(init);
  const [search, setSearch] = useState('');
  const [notification, setNotif] = useState(defaultError);

  const del = (person: Person) => {
    if (!window.confirm('Delete ' + persons.find(x => x.id === person.id)?.name))
      return;
    Server.Delete(person.id).then(() => setPersons(persons.filter(x => x.id !== person.id)))
      .catch(error => {
        setNotif({ type: 'error', msg: error.toString() });
        Server.All().then(x => setPersons(x));
      });
  };

  const update = (person: Person) => {
    let found = persons.find(x => x.name === person.name);

    if (!found) {
      Server.Add(person).then(x => {
        setPersons([...persons, x]);
        setNotif({ type: 'success', msg: 'Added ' + person.name + ' succesfully' });
        Server.All().then(x => setPersons(x));
      }).catch(error => {
        setNotif({ type: 'error', msg: error.response.data });
        console.log(error.response.data);
      });
      return;
    }

    if (!window.confirm(person.name + ' already exists, replace the old number?'))
      return;
    let p: Person = found;
    p.number = person.number;
    
    Server.Replace(found).then(() => {
      setPersons(persons.map(x => x.id !== p.id ? x : p));
      setNotif({ type: 'success', msg: 'Modified ' + person.name + ' succesfully' });
    }).catch(error => {
      setNotif({ type: 'error', msg: error.toString() });
      Server.All().then(x => setPersons(x));
    });
  };

  if (notification.msg !== '') {
    setTimeout(() => {
      setNotif(defaultError);
    }, alertTimeout);
  }

  useEffect(() => {
    Server.All().then(x => setPersons(x));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Search update={x => setSearch(x)} />
      <h3>Add a new number</h3>
      {notification.msg !== '' ? Notification.Display(notification) : ''}
      <Form update={update} persons={persons} setNotif={setNotif} />
      <h3>Numbers</h3>
      <Numbers persons={persons} search={search} del={del} />
    </div>
  );
}

export default App;
