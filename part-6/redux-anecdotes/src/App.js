import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import service from './anecdoteService';
import { initAnecdotes } from './reducers/anecdoteReducer';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    service.getAll().then(data => dispatch(initAnecdotes(data)));
  });

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  );
}

export default App;