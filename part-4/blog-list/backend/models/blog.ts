import mongoose from 'mongoose';

export type Blog = {
    title: string;
    author: string;
    url: string;
    likes: number;
};

const blogSchema = new mongoose.Schema<Blog>({
    title: String,
    author: String,
    url: String,
    likes: Number
});

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

export const Blog = mongoose.model<Blog>('Blog', blogSchema);