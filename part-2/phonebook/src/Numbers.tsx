import React from 'react';

function Numbers({ numbers, search, del }: { numbers: Person[], search: string, del: (person: Person) => void; }) {
  const filter = (x: Person) => x.name.toLowerCase().includes(search.toLowerCase());
  const mapper = (x: Person) => (
    <p style={{ margin: 0 }} key={x.name}>
      {x.name} {x.number} <button onClick={() => del(x)}>delete</button>
    </p>
  );

  return (
    <div>
      {numbers.filter(filter).map(mapper)}
    </div>
  );
}

export default Numbers;