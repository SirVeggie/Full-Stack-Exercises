import { Router } from 'express';
import { Blog } from '../models/blog';

export const blogRouter = Router();

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
});

blogRouter.post('/', async (req, res) => {
    const blog = verifyBlog(req.body);
    
    if (blog == null) {
        return res.status(400).end();
    }
    
    const result = await new Blog(blog).save();
    res.status(201).json(result);
});

blogRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    
    await Blog.deleteOne({ _id: id });
    res.status(200).end();
});

blogRouter.put('/:id', async (req, res) => {
    const id = req.params.id;
    const blog = verifyBlog(req.body);
    
    if (blog == null) {
        return res.status(400).end();
    }
    
    const result = await Blog.findByIdAndUpdate(id, blog, { new: true });
    
    if (result == null) {
        return res.status(404).end();
    }
    
    res.status(200).json(result);
});

function verifyBlog(blog: Blog) {
    if (!blog.title || !blog.url)
        return null;
    return {
        ...blog,
        likes: blog.likes ?? 0
    } as Blog;
}