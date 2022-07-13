import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
    query allAuthors {
        allAuthors {
            id
            name
            born
            bookCount
        }
    }
`;

export const ALL_BOOKS = gql`
    query allBooks($author: String, $genre: String) {
        allBooks(author: $author, genre: $genre) {
            id
            title
            published
            author { name }
            genres
        }
    }
`;

export const FIND_AUTHOR = gql`
    query findAuthorByName($name: String!) {
        findAuthor(name: $name) {
            id,
            name,
            born,
            bookCount
        }
    }
`;

export const ADD_BOOK = gql`
    mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
        addBook(title: $title, published: $published, author: $author, genres: $genres) {
            title,
            published,
            author { name },
            genres
        }
    }
`;

export const SET_BIRTHYEAR = gql`
    mutation setBirthYear($name: String!, $born: Int!) {
        editAuthor(name: $name, born: $born) {
            id,
            name,
            born
        }
    }
`;

export const CREATE_USER = gql`
    mutation createUser($username: String!, $password: String!, $favoriteGenre: String!) {
        createUser(username: $username, password: $password, favoriteGenre: $favoriteGenre) {
            id
            username
            favoriteGenre
        }
    }
`;
        

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`;

export const ME = gql`
    query me {
        me {
            username
            favoriteGenre
        }
    }
`;