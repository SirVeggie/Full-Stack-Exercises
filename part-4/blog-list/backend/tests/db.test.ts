import mongoose from 'mongoose';
import supertest from 'supertest';
import { app } from '../app';
import { Blog } from '../models/blog';

const api = supertest(app);

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
];

beforeEach(async () => {
	await Blog.deleteMany({});
	const promises = blogs
		.map(blog => new Blog(blog))
		.map(x => x.save());
	await Promise.all(promises);
});

describe('fetching blogs', () => {
	test('correct amount of blogs', async () => {
		const res = await api.get('/api/blogs');
		expect(res.body).toHaveLength(blogs.length);
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
			likes: 0
		};
		
		await api
			.post('/api/blogs')
			.send(blog)
			.expect(201)
			.expect('Content-Type', /application\/json/);
		
		const res = await api.get('/api/blogs');
		expect(res.body).toHaveLength(blogs.length + 1);
	});

	test('likes defaults to 0', async () => {
		const blog: any = {
			author: 'asd',
			title: 'asd',
			url: 'asd'
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
			title: 'asd'
		};
		
		const blog2: any = {
			author: 'asd',
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
	});
});

describe('deleting blogs', () => {
	test('deleting blog', async () => {
		let body = (await api.get('/api/blogs')).body;
		await api
		.delete(`/api/blogs/${body[0].id}`)
		.expect(200);
		
		body = (await api.get('/api/blogs')).body;
		expect(body).toHaveLength(blogs.length - 1);
	});
});

describe('updating blogs', () => {
	test('updating blog changes content', async () => {
		let body = (await api.get('/api/blogs')).body;
		
		const blog: Blog = {
			author: 'asd',
			title: 'asd',
			url: 'asd',
			likes: 0
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
			likes: 0
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