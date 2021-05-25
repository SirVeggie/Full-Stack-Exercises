import React from 'react';

function App() {
  const now = new Date();

  return (
    <div>
      <p>Hello world, it is {now.toString()}</p>
      <ShowPerson name='Jack' age={20} sex='male' />
      <ShowPerson name='Janette' age={21} sex='female' />
    </div>
  );
}

function ShowPerson(props: Person) {
  return (
    <div>
      <p>Person {props.name} is of age {props.age} and is a {props.sex}</p>
    </div>
  );
}

interface Person {
  name: string;
  age: number;
  sex: string;
}

export default App;
