import React, { useState } from 'react';

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Anecdotes />
      <h1>Give Feedback</h1>
      <Buttons fGood={() => setGood(good + 1)} fNeutral={() => setNeutral(neutral + 1)} fBad={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

function Buttons({ fGood, fNeutral, fBad }: Record<string, () => void>) {
  return (
    <div>
      <Button text='Good' func={fGood} />
      <Button text='Neutral' func={fNeutral} />
      <Button text='Bad' func={fBad} />
    </div>
  );
}

function Button({ text, func }: Button) {
  return (
    <button onClick={func}>{text}</button>
  );
}

function Statistics({ good, neutral, bad }: Record<string, number>) {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = good / all * 100;

  if (all === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        No feedback given
      </div>
    );
  }

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <Statistic text='Good' value={good + ''} />
          <Statistic text='Neutral' value={neutral + ''} />
          <Statistic text='Bad' value={bad + ''} />
          <Statistic text='Average' value={average + ''} />
          <Statistic text='Positive' value={positive + ' %'} />
        </tbody>
      </table>
    </div>
  );
}

function Statistic({ text, value }: Statistic) {
  return (
    <tr>
      <td>
        {text}:
      </td>
      <td>
        {value}
      </td>
    </tr>
  );
}

function Anecdotes() {
  const anecdotes = [
    { votes: 0, content: 'If it hurts, do it more often' },
    { votes: 0, content: 'Adding manpower to a late software project makes it later!' },
    { votes: 0, content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.' },
    { votes: 0, content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.' },
    { votes: 0, content: 'Premature optimization is the root of all evil.' },
    { votes: 0, content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.' }
  ];

  const [state, setState] = useState(anecdotes);
  const [index, setIndex] = useState(0);
  const current = state[index];
  const mostVoted = state.reduce((a, b) => a.votes >= b.votes ? a : b);
  
  const randIndex = () => {
    let i = Math.floor(Math.random() * (state.length - 1));
    if (i >= index)
      i++;
    setIndex(i);
  }
  const addVote = () => {
    let copy = [ ...state ];
    copy[index].votes += 1
    setState(copy);
  };

  return (
    <div>
      <h1>Anecdotes</h1>
      <Anecdote data={current} />
      <Button text='vote' func={addVote} />
      <Button text='next anecdote' func={randIndex} />
      <h1>Most voted anecdote</h1>
      <Anecdote data={mostVoted} />
    </div>
  );
}

function Anecdote({ data }: Prop<{ votes: number, content: string }>) {
  return (
    <>
      {data.content}<br />
      Has {data.votes} vote{data.votes === 1 ? '' : 's'}<br />
    </>
  );
}

export default App;
