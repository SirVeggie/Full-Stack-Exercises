import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dao from './src/dao';

morgan.token('body', (req: any) => JSON.stringify(req.body));

const server = express();
server.use(express.static('build'));
server.use(express.json());
server.use(cors());
server.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

//=====| controllers |=====//

server.get('/info', async (req, res, next) => {
  let persons: any[] = [];
  try {
    persons = await dao.GetAll();
  } catch (error) {
    return next(error);
  }

  let response = 'Phonebook has info for ' + persons.length + ' people';
  response += '<br><br>' + new Date().toString();
  res.send(response);
});

server.get('/api/persons', async (req, res, next) => {
  try {
    res.json(await dao.GetAll());
  } catch (error) {
    return next(error);
  }
});

server.get('/api/persons/:id', async (req, res, next) => {
  let person: any;
  try {
    person = await dao.GetByID(req.params.id);
  } catch (error) {
    return next(error);
  }

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

server.post('/api/persons', async (req, res, next) => {
  const data = {
    id: '',
    name: req.body.name,
    number: req.body.number
  };

  dao.Add(data).then(x => res.json(x)).catch(next);
});

server.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  dao.Delete(id).then(() => {
    res.status(204).end();
  }).catch(next);
});

server.put('/api/persons/:id', async (req, res, next) => {
  const data = {
    id: req.params.id,
    name: req.body.name,
    number: req.body.number
  };

  dao.Update(data).then(x => res.json(x)).catch(next);
});

//=====| other |=====//

const unknownEndpoint = (req, res) => {
  res.status(404).send('unknown endpoint');
};

server.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === 'CastError')
    return res.status(400).send('malformatted id');
  if (error.name === 'ValidationError')
    return res.status(400).send(error.message);
  next(error);
};

server.use(errorHandler);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});