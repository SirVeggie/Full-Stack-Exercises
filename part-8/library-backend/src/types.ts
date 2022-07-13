import mongoose from 'mongoose';

export type Author = {
    id: mongoose.Schema.Types.ObjectId;
    name: string;
    born?: number;
};

export type Book = {
    id: mongoose.Schema.Types.ObjectId;
    title: string;
    published: number;
    author: mongoose.Schema.Types.ObjectId;
    genres: string[];
};

export type User = {
    id: mongoose.Schema.Types.ObjectId;
    username: string;
    favoriteGenre: string;
    passwordHash: string;
};

export type Token = {
    value: string;
}