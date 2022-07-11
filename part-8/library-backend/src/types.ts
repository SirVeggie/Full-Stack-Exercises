
export type Author = {
    id: string;
    name: string;
    born?: number;
};

export type Book = {
    id: string;
    title: string;
    published: number;
    author: string;
    genres: string[];
};