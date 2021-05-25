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

function Header({ data }: Prop<string>) {
  return (<h1>{data}</h1>);
}

function Content({ data }: Prop<Detail[]>) {
  return (
    <div>
      <Part data={data[0]} />
      <Part data={data[1]} />
      <Part data={data[2]} />
    </div>
  );
}

function Total({ data }: Prop<Detail>) {
  return (
    <Part data={data} />
  );
}

function Part({ data }: Prop<Detail>) {
  return (
    <p>{data.name}: {data.exercises}</p>
  );
}

export default App;
