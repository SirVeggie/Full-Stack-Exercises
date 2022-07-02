import { User } from '../models/user';
import bcrypt from 'bcrypt';
import { app } from '../app';
import supertest from 'supertest';
import mongoose from 'mongoose';

const api = supertest(app);

describe('creating users', () => {
	beforeEach(async () => {
		await User.deleteMany({});
		
		const hash = await bcrypt.hash('password', 10);
		const user = new User({
			username: 'root',
			name: 'root',
			passHash: hash
		});
		
		await user.save();
	});
	
	test('creating fresh username succeeds', async () => {
		const existingUsers = (await api.get('/api/users')).body;
		
		const user = {
			username: 'SirVeggie',
			name: 'Veikka',
			password: 'magic'
		};
		
		await api
			.post('/api/users')
			.send(user)
			.expect(201)
			.expect('Content-Type', /application\/json/);
		
		const newUsers = (await api.get('/api/users')).body;
		expect(newUsers).toHaveLength(existingUsers.length + 1);
		expect(newUsers.map((x: User) => x.username)).toContain(user.username);
	});
	
	test('creating existing username fails', async () => {
		const existingUsers = (await api.get('/api/users')).body;
		
		const user = {
			username: existingUsers[0].username,
			name: 'random',
			password: 'omagawd'
		};
		
		await api
			.post('/api/users')
			.send(user)
			.expect(400);
	});
	
	test('creating a user without username or password fails', async () => {
		const user1 = {
			name: 'hello',
			password: 'world'
		}
		
		const user2 = {
			username: 'hello',
			name: 'world'
		}
		
		await api
			.post('/api/users')
			.send(user1)
			.expect(400)
			.expect('Content-Type', /application\/json/);
		
		await api
			.post('/api/users')
			.send(user2)
			.expect(400)
			.expect('Content-Type', /application\/json/);
	});
	
	test('creating a user with a short username or password fails', async () => {
		const user1 = {
			username: 'a',
			password: 'abcd'
		}
		
		const user2 = {
			username: 'abcd',
			password: 'b'
		}
		
		await api
			.post('/api/users')
			.send(user1)
			.expect(400)
			.expect('Content-Type', /application\/json/);
		
			await api
			.post('/api/users')
			.send(user2)
			.expect(400)
			.expect('Content-Type', /application\/json/);
	});
});

afterAll(() => {
	mongoose.connection.close();
});