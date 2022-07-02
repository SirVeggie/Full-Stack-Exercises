import { Router } from 'express';
import { Blog } from '../models/blog';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

export const blogRouter = Router();

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    res.json(blogs);
});

blogRouter.post('/', async (req, res) => {
    if (!(req as any).user)
        return res.status(401).json({ error: 'token invalid' });
    
    const user = await User.findById((req as any).user);
    if (user == null)
        return res.status(404).json({ error: 'user matching the token not found' });
    
    req.body.user = (req as any).user;
    const blog = verifyBlog(req.body);
    
    if (blog == null) {
        return res.status(400).json({ error: 'invalid blog' });
    }
    
    const result = await new Blog(blog).save();
    user.blogs = user.blogs.concat(result.id);
    await user.save();
    
    res.status(201).json(result);
});

blogRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    
    const removedBlog = await Blog.findById(id);
    if (removedBlog == null)
        return res.status(404).json({ error: 'blog not found' });
    if (removedBlog.user.toString() !== (req as any).user)
        return res.status(401).json({ error: 'user not authorized' });
    
    await Blog.findByIdAndRemove(id);
    const user = await User.findById((req as any).user);
    if (user != null) {
        user.blogs = user.blogs.filter(x => x != id);
        await user.save();
    }
    
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
    if (!blog.title || !blog.url || !blog.user)
        return null;
    return {
        ...blog,
        likes: blog.likes ?? 0
    } as Blog;
}