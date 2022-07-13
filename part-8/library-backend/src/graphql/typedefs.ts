import { gql } from 'apollo-server';

export default gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    findBook(title: String!): Book
    findAuthor(name: String!): Author
    me: User
  }
  
  type User {
    id: ID!
    username: String!
    favoriteGenre: String!
    passwordHash: String!
  }
  
  type Token {
    value: String!
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
    createUser(
      username: String!
      favoriteGenre: String!
      password: String!
    ): User
    
    login(
      username: String!
      password: String!
    ): Token
    
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    
    editAuthor(
      name: String!
      born: Int!
    ): Author
  }
`;