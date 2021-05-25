import React from 'react';

function App() {
  const course = {
    name: 'Half stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  const total = {
    name: 'Number of exercises',
    exercises: course.parts.map(x => x.exercises).reduce((a, b) => a + b, 0)
  };

  return (
    <div>
      <Header data={course.name} />
      <Content data={course.parts} />
      <Total data={total} />
    </div >
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
    <p>{props.data.name}: {props.data.exercises}</p>
  );
}

export default App;
