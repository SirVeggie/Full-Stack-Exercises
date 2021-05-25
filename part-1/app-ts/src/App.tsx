import React from 'react';

function App() {
  const course = 'Half stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  const details = [
    { description: part1, points: exercises1 },
    { description: part2, points: exercises2 },
    { description: part3, points: exercises3 }
  ];

  const total = {
    description: 'Number of exercises',
    points: exercises1 + exercises2 + exercises3
  };

  return (
    <div>
      <Header data={course} />
      <Content data={details} />
      <Total data={total} />
    </div>
  );
}

function Header(props: Prop<string>) {
  return (<h1>{props.data}</h1>);
}

function Content(props: Prop<Detail[]>) {
  return (
    <div>
      <Part data={props.data[0]} />
      <Part data={props.data[1]} />
      <Part data={props.data[2]} />
    </div>
  );
}

function Total(props: Prop<Detail>) {
  return (
    <Part data={props.data} />
  );
}

function Part(props: Prop<Detail>) {
  return (
    <p>{props.data.description}: {props.data.points}</p>
  );
}

export default App;
