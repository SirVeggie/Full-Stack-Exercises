import { Blog } from "../models/blog";

export function dummy(blogs: Blog[]) {
    return 1;
}

export function totalLikes(blogs: Blog[]) {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
}

export function favoriteBlog(blogs: Blog[]) {
    if (blogs.length === 0)
        return undefined;
    return blogs.reduce((prev, current) => prev.likes > current.likes ? prev : current);
}

export function mostBlogs(blogs: Blog[]) {
    if (blogs.length === 0)
        return undefined;
    const authors = blogs.map(blog => blog.author);
    const uniqueAuthors = [...new Set(authors)];
    const authorCount = uniqueAuthors.map(author => {
        return {
            author,
            blogs: authors.filter(blog => blog === author).length
        };
    });
    
    return authorCount.reduce((prev, current) => prev.blogs > current.blogs ? prev : current);
}

export function mostLikes(blogs: Blog[]) {
    if (blogs.length === 0)
        return undefined;
    const authors = blogs.map(blog => blog.author);
    const uniqueAuthors = [...new Set(authors)];
    const authorCount = uniqueAuthors.map(author => {
        return {
            author,
            likes: blogs.filter(blog => blog.author === author).reduce((sum, blog) => sum + blog.likes, 0)
        };
    });
    
    return authorCount.reduce((prev, current) => prev.likes > current.likes ? prev : current);
}