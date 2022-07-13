import { UserInputError } from 'apollo-server';
import { login, newUser } from '../auth';
import { AuthorDB, BookDB, UserDB } from '../db';
import { Author, Book } from '../types';

export default {
  Query: {
    bookCount: async () => BookDB.collection.countDocuments(),
    authorCount: async () => AuthorDB.collection.countDocuments(),
    allBooks: async (_root: any, args: any) => {
      const vars: any = {};
      if (args.author)
        vars.author = args.author;
      if (args.genre)
        vars.genres = args.genre;
      return BookDB.find(vars);
    },
    allAuthors: async () => AuthorDB.find({}),
    findBook: async (_root: any, args: any) =>
      BookDB.findOne({ title: args.title }),
    findAuthor: async (_root: any, args: any) =>
      AuthorDB.findOne({ name: args.name }),
    me: async (_root: any, _args: any, context: any) => {
      return context.user;
    }
  },

  Book: {
    author: async (root: Book) =>
      AuthorDB.findOne({ _id: root.author })
  },

  Author: {
    books: async (root: Author) =>
      BookDB.find({ author: root.id }),
    bookCount: async (root: Author) =>
      BookDB.count({ author: root.id })
  },

  Mutation: {
    createUser: async (_root: any, args: any) => {
      if (await UserDB.findOne({ username: args.username }))
        throw new UserInputError('Username already taken');
      const user = await handle(newUser(args.username, args.password, args.favoriteGenre), args);
      return handle(UserDB.create(user), args);
    },

    login: async (_root: any, args: any) => {
      return handle(login(args.username, args.password), args);
    },

    addBook: async (_root: any, args: any, context: any) => {
      if (!context.user)
        throw new UserInputError('Not logged in');
      const book: Book = { ...args };
      if (await BookDB.findOne({ title: book.title }))
        throw new UserInputError(`Book '${book.title}' already exists`);
      let author = await AuthorDB.findOne({ name: book.author });
      if (!author)
        author = await handle(AuthorDB.create({ name: book.author }), args);
      book.author = author.id;
      return handle(BookDB.create(book), args);
    },

    editAuthor: async (_root: any, args: any, context: any) => {
      if (!context.user)
        throw new UserInputError('Not logged in');
      const author = await AuthorDB.findOne({ name: args.name });
      if (!author)
        throw new UserInputError(`Author '${args.name}' does not exist`);
      author.born = args.born;
      return handle(author.save(), args);
    }
  }
};

async function handle<T>(value: Promise<T>, args: any): Promise<T> {
  try {
    return await value;
  } catch (err) {
    throw new UserInputError(err.message, { invalidArgs: args });
  }
}