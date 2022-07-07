import mongoose from 'mongoose';
import supertest from 'supertest';
import { app } from '../app';
import { Blog } from '../models/blog';
import { User } from '../models/user';
import { testBlogs } from '../utils/list_helper';
import bcrypt from 'bcrypt';

const api = supertest(app);
let testUser = null as any;


beforeEach(async () => {
	await User.deleteMany({});
	await new User({
		username: 'root',
		name: 'none',
		passHash: await bcrypt.hash('magic', 10),
		blogs: []
	}).save();
	
	testUser = await User.findOne({ username: 'root' });
	
	await Blog.deleteMany({});
	const promises = testBlogs
		.map(x => {return { ...x, user: testUser.id }})
		.map(x => new Blog(x))
		.map(x => x.save());
	await Promise.all(promises);
});

describe('fetching blogs', () => {
	test('correct amount of blogs', async () => {
		const res = await api.get('/api/blogs');
		expect(res.body).toHaveLength(testBlogs.length);
	});

	test('blogs are returned as json', async () => {
		await api.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

	test('blogs have id', async () => {
		const res = await api.get('/api/blogs');
		expect(res.body[0].id).toBeDefined();
	});
});

describe('creating blogs', () => {
	test('adding blogs increase their number', async () => {
		const blog: Blog = {
			author: 'asd',
			title: 'asd',
			url: 'asd',
			likes: 0,
			user: testUser.id
		};
		
		await api
			.post('/api/blogs')
			.send(blog)
			.expect(201)
			.expect('Content-Type', /application\/json/);
		
		const res = await api.get('/api/blogs');
		expect(res.body).toHaveLength(testBlogs.length + 1);
	});

	test('likes defaults to 0', async () => {
		const blog: any = {
			author: 'asd',
			title: 'asd',
			url: 'asd',
			user: testUser.id
		};
		
		await api
			.post('/api/blogs')
			.send(blog)
			.expect(201);
		
		const res = await api.get('/api/blogs');
		const latest = res.body.find((x: Blog) => x.url === blog.url);
		expect(latest.likes).toBe(0);
	});

	test('missing data returns bad request', async () => {
		const blog1: any = {
			author: 'asd',
			title: 'asd',
			user: testUser.id
		};
		
		const blog2: any = {
			author: 'asd',
			url: 'asd',
			user: testUser.id
		};
		
		const blog3: any = {
			author: 'asd',
			title: 'asd',
			url: 'asd'
		};
		
		await api
			.post('/api/blogs')
			.send(blog1)
			.expect(400);
		
		await api
			.post('/api/blogs')
			.send(blog2)
			.expect(400);
		
		await api
			.post('/api/blogs')
			.send(blog3)
			.expect(400);
	});
});

describe('deleting blogs', () => {
	test('deleting blog', async () => {
		let body = (await api.get('/api/blogs')).body;
		await api
		.delete(`/api/blogs/${body[0].id}`)
		.expect(200);
		
		body = (await api.get('/api/blogs')).body;
		expect(body).toHaveLength(testBlogs.length - 1);
	});
});

describe('updating blogs', () => {
	test('updating blog changes content', async () => {
		let body = (await api.get('/api/blogs')).body;
		
		const blog: Blog = {
			author: 'asd',
			title: 'asd',
			url: 'asd',
			likes: 0,
			user: testUser.id
		};
		
		await api
		.put(`/api/blogs/${body[0].id}`)
		.send(blog)
		.expect(200)
		.expect('Content-Type', /application\/json/);
		
		body = (await api.get('/api/blogs')).body;
		expect(body[0].author).toBe('asd');
	});
	
	test('updating missing blog fails', async () => {
		let body = (await api.get('/api/blogs')).body;
		await api
			.delete(`/api/blogs/${body[0].id}`)
			.expect(200);
		
		const blog: Blog = {
			author: 'asd',
			title: 'asd',
			url: 'asd',
			likes: 0,
			user: testUser.id
		};
		
		await api
			.put(`/api/blogs/${body[0].id}`)
			.send(blog)
			.expect(404);
	});
});
	
afterAll(() => {
	mongoose.connection.close();
});