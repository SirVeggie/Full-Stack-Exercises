import mongoose from 'mongoose';

export type Blog = {
    title: string;
    author: string;
    url: string;
    likes: number;
    user: mongoose.SchemaDefinitionProperty<string>;
};

const blogSchema = new mongoose.Schema<Blog>({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

export const Blog = mongoose.model<Blog>('Blog', blogSchema);