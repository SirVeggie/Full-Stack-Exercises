import { Router } from 'express';
import { Blog } from '../models/blog';

export const blogRouter = Router();

blogRouter.get('/', (req, res) => {
    Blog.find({}).then((blogs) => {
        res.json(blogs);
    });
});

blogRouter.post('/', (req, res) => {
    const blog = new Blog(req.body);

    blog.save().then((result: any) => {
        res.status(201).json(result);
    });
});