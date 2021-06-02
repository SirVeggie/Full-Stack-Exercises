import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect, useParams, useHistory } from 'react-router-dom';

function App() {
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

function Single({ anecdotes }) {
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

function Menu() {
  const padding = {
    paddingRight: 5
  };

  return (
    <div>
      <Link to='/' style={padding}>anecdotes</Link>
      <Link to='/create' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  );
}

function AnecdoteList({ anecdotes }) {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => (
          <li key={anecdote.id}>
            <Link to={'/anecdote/' + anecdote.id}>
              {anecdote.content}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About anecdote app</h2>
      <p>According to Wikipedia:</p>

      <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

      <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </div>
  );
}

function CreateNew(props) {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [info, setInfo] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content,
      author,
      info,
      votes: 0
    });
    
    history.push('/');
    props.notify('A new anecdote \'' + content + '\' created!')
    
    setTimeout(() => {
      props.notify('');
    }, 10000);
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  );
}

function Footer() {
  return (
    <div>
      Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

      See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
    </div>
  );
}

export default App;