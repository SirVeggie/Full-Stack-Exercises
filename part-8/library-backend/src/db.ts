import mongoose from 'mongoose';
import { Author, Book, User } from './types';

const author = new mongoose.Schema<Author>({
    name: {
        type: String,
        required: true,
        minlength: 4,
        unique: true
    },
    born: {
        type: Number
    }
});

export const AuthorDB = mongoose.model('Author', author);

const book = new mongoose.Schema<Book>({
    title: {
        type: String,
        required: true,
        minlength: 2,
        unique: true
    },
    published: {
        type: Number,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    genres: {
        type: [String],
        required: true
    }
});

export const BookDB = mongoose.model('Book', book);

const user = new mongoose.Schema<User>({
    username: {
        type: String,
        required: true,
        minlength: 2,
        unique: true
    },
    favoriteGenre: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    }
});

export const UserDB = mongoose.model('User', user);