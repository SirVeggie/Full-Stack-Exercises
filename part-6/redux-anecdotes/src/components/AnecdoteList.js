import React from 'react';
import { connect } from 'react-redux';
import { voteAction } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

//====| Presentation |====//

function AnecdoteList({ anecdotes, vote }) {
  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} <button onClick={() => vote(anecdote.id, anecdotes)}>vote</button>
          </div>
        </div>
      )}
    </>
  );
}

//====| Logic |====//

function mapAnecdotes(state) {
  const modifiedList = state.anecdotes.filter(x => {
    return state.filter === '' || x.content.toLowerCase().includes(state.filter.toLowerCase());
  }).sort((a, b) => b.votes - a.votes);

  return { anecdotes: modifiedList };
}

function mapDispatches(dispatch) {
  return {
    vote: (id, anecdotes) => {
      const target = anecdotes.find(x => x.id === id);
      dispatch(voteAction(id));
      dispatch(setNotification('You voted for \'' + target.content + '\'', 2));
    }
  };
};

const ConnectedList = connect(mapAnecdotes, mapDispatches)(AnecdoteList);

export default ConnectedList;