import { ApolloServer, gql, UserInputError } from 'apollo-server';
import { authors, books } from './src/data';
import { Author, Book } from './src/types';
import { v1 as uuid } from 'uuid';

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    findBook(title: String!): Book
    findAuthor(name: String!): Author
  }
  
  type Author {
    id: ID!
    name: String!
    born: Int
    books: [Book!]
    bookCount: Int!
  }
  
  type Book {
    id: ID!
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
  }
  
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    
    addAuthor(
      name: String!
      born: Int
    ): Author
    
    editAuthor(
      name: String!
      born: Int!
    ): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (_root: any, args: any) => {
      if (!args.author && !args.genre) {
        return books;
      }
      
      return books.filter(book =>
        (args.author == null || book.author === args.author) &&
        (args.genre == null || book.genres.includes(args.genre)));
    },
    allAuthors: () => authors,
    findBook: (_root: any, args: any) =>
      books.find(book => book.title === args.title),
    findAuthor: (_root: any, args: any) =>
      authors.find(author => author.name === args.name)
  },

  Book: {
    author: (root: Book) =>
      authors.find(author => author.name === root.author)
  },
  
  Author: {
    books: (root: Author) =>
      books.filter(book => book.author === root.name),
    bookCount: (root: Author) =>
      books.filter(book => book.author === root.name).length
  },

  Mutation: {
    addBook: (_root: any, args: any) => {
      const book: Book = { ...args, id: uuid() };
      if (!authors.find(author => author.name === args.author))
        authors.push({ name: args.author, id: uuid() });
      books.push(book);
      return book;
    },

    addAuthor: (_root: any, args: any) => {
      const author: Author = { ...args, id: uuid() };
      if (authors.find(author => author.name === args.name))
        throw new UserInputError(`Author ${args.name} already exists`);
      authors.push(author);
      return author;
    },
    
    editAuthor: (_root: any, args: any) => {
      const author: Author | undefined = authors.find(author => author.name === args.name);
      if (!author)
        return null;
      author.born = args.born;
      return author;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
