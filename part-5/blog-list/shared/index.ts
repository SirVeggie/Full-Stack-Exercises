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