import mongoose from 'mongoose';

export type BlogType = {
    id?: string;
    title: string;
    author: string;
    url: string;
    likes: number;
    user: mongoose.SchemaDefinitionProperty<string>;
};

export type UserType = {
	username: string;
	name: string;
	passHash: string;
	blogs: string[];
};

export function sanitizeBlog(blog: BlogType): BlogType | null {
    if (!blog.title || !blog.url || !blog.user)
        return null;
    return {
        ...blog,
        likes: blog.likes ?? 0,
        user: (blog.user as any).id ?? blog.user
    };
}