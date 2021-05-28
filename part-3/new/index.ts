import express from 'express';
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
	res.send('<h1>Magic!</h1>');
});

const PORT = 3001;
server.listen(PORT, () => {
	console.log('Server running on port ' + PORT);
});