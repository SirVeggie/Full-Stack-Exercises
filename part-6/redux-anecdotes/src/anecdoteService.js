import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

async function getAll() {
  return (await axios.get(baseUrl)).data;
}

async function create(content) {
  const obj = { content: content, votes: 0 };
  return (await axios.post(baseUrl, obj)).data;
}

async function replace(id, anecdote) {
  anecdote.id = id;
  await axios.put(baseUrl + '/' + id, anecdote);
}

export default { getAll, create, replace };