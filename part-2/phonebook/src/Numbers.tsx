import React from 'react';

function Numbers({ numbers, search }: { numbers: Person[], search: string; }) {
  const filter = (x: Person) => x.name.toLowerCase().includes(search.toLowerCase());
  const mapper = (x: Person) => <p style={{ margin: 0 }} key={x.name}>{x.name} {x.number}</p>;

  return (
    <div>
      {numbers.filter(filter).map(mapper)}
    </div>
  );
}

export default Numbers;