import React from 'react';
import Course from './Course';

function App() {
  const courses: Course[] = [
    {
      id: 1,
      name: 'Half stack application development',
      parts: [
        {
          id: 1,
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
          id: 2,
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          id: 3,
          name: 'State of a component',
          exercises: 14
        },
        {
          id: 4,
          name: 'Redux',
          exercises: 11
        }
      ]
    },
    {
      id: 2,
      name: 'Node.js',
      parts: [
        {
          id: 1,
          name: 'Routing',
          exercises: 3
        },
        {
          id: 2,
          name: 'Middlewares',
          exercises: 7
        }
      ]
    }
  ];

  return <Courses data={courses} />;
}

function Courses({ data }: Prop<Course[]>) {
  return (
    <div>
      {data.map(x => <Course data={x} />)}
    </div>
  );
}

export default App;
