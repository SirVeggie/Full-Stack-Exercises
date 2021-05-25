import React from 'react';

function Course({ data }: Prop<Course>) {
  return (
    <div key={data.id}>
      <Header data={data.name} />
      <Content data={data.parts} />
    </div>
  );
}

function Header({ data }: Prop<string>) {
  return (<h1>{data}</h1>);
}

function Content({ data }: Prop<Part[]>) {
  return (
    <div>
      {data.map(x => <Part data={x} />)}
      <Total data={data.reduce((sum, x) => sum + x.exercises, 0)} />
    </div>
  );
}

function Total({ data }: Prop<number>) {
  return <p><b>Total of {data} exercises</b></p>;
}

function Part({ data }: Prop<Part>) {
  return <p key={data.id}>{data.name}: {data.exercises}</p>;
}

export default Course;