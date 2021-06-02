import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

//====| Presentation |====//

function AnecdoteForm({ addAnecdote }) {
  return (
    <form onSubmit={addAnecdote}>
      <div><input name='field' /></div>
      <button>create</button>
    </form>
  );
}

//====| Logic |====//

function mapDispatchToProps(dispatch) {
  return {
    addAnecdote: event => {
      event.preventDefault();
      const content = event.target.field.value;
      event.target.field.value = '';
      dispatch(createAnecdote(content));
      dispatch(setNotification('Created anecdote \'' + content + '\'', 10));
    }
  };
}

const ConnectedForm = connect(null, mapDispatchToProps)(AnecdoteForm);

export default ConnectedForm;