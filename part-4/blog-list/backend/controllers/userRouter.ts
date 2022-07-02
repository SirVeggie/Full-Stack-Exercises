import { Router } from 'express';
import { Blog } from '../models/blog';
import { User } from '../models/user';
import bcrypt from 'bcrypt';

export const userRouter = Router();

userRouter.get('/', async (req, res) => {
	const users = await User.find({}).populate('blogs', { title: 1, author: 1 });
	res.json(users);
});

userRouter.post('/', async (req, res) => {
	const obj = await newUser(req.body);
	
	if (obj.error != null) {
		return res.status(400).json({ error: obj.error });
	}
	
	if (await User.findOne({ username: obj.user!.username }) != null) {
		return res.status(400).json({ error: 'username already exists' });
	}
	
	const result = await new User(obj.user).save();
	res.status(201).json(result);
});

userRouter.delete('/:id', async (req, res) => {
	const id = req.params.id;
	
	await Blog.deleteMany({ user: 'id' });
	await User.deleteOne({ _id: id });
	res.status(200).end();
});

// userRouter.put('/:id', async (req, res) => {
// 	const id = req.params.id;
// 	const user = verifyUser(req.body);
	
// 	if (user == null) {
// 		return res.status(400).end();
// 	}
	
// 	const result = await User.findByIdAndUpdate(id, user, { new: true });
	
// 	if (result == null) {
// 		return res.status(404).end();
// 	}
	
// 	res.status(200).json(result);
// });

async function newUser(user: any): Promise<{ error?: string, user?: User }> {
	if (!user.username || !user.password)
		return { error: 'missing username or password' };
	if (user.username.length < 3 || user.password.length < 3)
		return { error: 'username or password too short (at least 3 characters)' };
	return { user: {
		...user,
		name: user.name ?? '',
		passHash: await generateHash(user.password),
		blogs: user.blogs ?? []
	}}
}

function generateHash(password: string): Promise<string> {
	const saltRounds = 10;
	return bcrypt.hash(password, saltRounds);
}