import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const server = express();
server.use(cors());
server.use(express.json());
morgan.token('body', (req: any, res: any) => JSON.stringify(req.body));
server.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
server.use(express.static('build'));

let persons = [
	{
		"name": "Arto Hellas",
		"number": "123-88-1234567",
		"id": 1
	},
	{
		"name": "Ada Lovelace",
		"number": "39-44-5323523",
		"id": 2
	},
	{
		"name": "Dan Abramov",
		"number": "12-43-234345",
		"id": 3
	},
	{
		"name": "Mary Poppendieck",
		"number": "39-23-6423122",
		"id": 4
	}
];

server.get('/info', (req, res) => {
	let response = 'Phonebook has info for ' + persons.length + ' people';
	response += '<br><br>' + new Date().toString();
	res.send(response);
});

server.get('/api/persons', (req, res) => {
	res.json(persons);
});

server.get('/api/persons/:id', (req, res) => {
	const data = persons.find(x => x.id === Number(req.params.id));

	if (data) {
		res.json(data);
	} else {
		res.status(404).end();
	}
});

server.post('/api/persons', (req, res) => {
	let data = {
		id: req.body.id,
		name: req.body.name,
		number: req.body.number
	};

	if (!data.name || !data.number) {
		return res.status(400).end('missing name or number');
	}

	if (persons.find(x => x.name === data.name)) {
		return res.status(400).end('duplicate name');
	}

	let id = 0;
	while (!id || persons.find(x => x.id === id)) {
		id = Math.floor(Math.random() * 10000000);
	}

	data.id = id;
	persons.push(data);
	res.status(200).end();
});

server.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id);
	persons = persons.filter(x => x.id !== id);
	res.status(204).end();
});

server.put('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id);
	const data = {
		id: id,
		name: req.body.name,
		number: req.body.number
	};

	if (!persons.find(x => x.id === id)) {
		return res.status(404).end();
	}

	if (!data.name || !data.number) {
		return res.status(400).end('missing name or number');
	}

	persons = persons.map(x => x.id !== id ? x : data);
	res.status(200).end();
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
	console.log('Server running on port ' + PORT);
});