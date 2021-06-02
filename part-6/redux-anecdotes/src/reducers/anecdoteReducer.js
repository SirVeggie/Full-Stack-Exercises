import service from '../anecdoteService';

export function voteAction(id) {
  return async (dispatch, getState) => {
    const { anecdotes } = getState();
    const anecdote = { ...anecdotes.find(x => x.id === id) };
    anecdote.votes++;
    await service.replace(id, anecdote);
    dispatch({ type: 'VOTE', id: id });
  };
}

export function createAnecdote(content) {
  return async dispatch => {
    const data = await service.create(content);
    dispatch({ type: 'CREATE', data: data });
  };
}

export function initAnecdotes() {
  return async dispatch => {
    const data = await service.getAll();
    dispatch({ type: 'INIT', data: data });
  };
}

const initialState = [];

function anecdoteReducer(state = initialState, action) {
  switch (action.type) {
    case 'VOTE':
      return state.map(x => x.id !== action.id ? x : { ...x, votes: x.votes + 1 });
    case 'CREATE':
      return [...state, action.data];
    case 'INIT':
      return action.data;
    default:
      return state;
  }
}

export default anecdoteReducer;