import { Router } from 'express';
import { Blog } from '../models/blog';
import { User } from '../models/user';

export const testRouter = Router();

testRouter.post('/reset', async (req, res) => {
    await Blog.deleteMany({});
    await User.deleteMany({});
    res.status(204).end();
});