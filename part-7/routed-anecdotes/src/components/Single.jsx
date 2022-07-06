import { useParams } from "react-router";

export function Single({ anecdotes }) {
  const id = useParams().id;
  const anecdote = anecdotes.find(x => x.id === id);

  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>Has {anecdote.votes} votes</p>
      <p>For more info see <a target='_blank' rel='noreferrer' href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  );
}