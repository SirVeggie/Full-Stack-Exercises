import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { About } from './components/About';
import { AnecdoteList } from './components/AnecdoteList';
import { CreateNew } from './components/CreateNew';
import { Footer } from './components/Footer';
import { Menu } from './components/Menu';
import { Single } from './components/Single';

export function App() {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ]);

  const [notification, setNotification] = useState('');

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    };

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a));
  };

  return (
    <BrowserRouter>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />

        {notification}

        <Switch>
          <Route path='/anecdote/:id'>
            <Single anecdotes={anecdotes} />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/create'>
            <CreateNew addNew={addNew} notify={setNotification} />
          </Route>
          <Route path='/'>
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
        </Switch>

        <Footer />
      </div>
    </BrowserRouter>
  );
}