
export type IAuthor = {
    id: string;
    name: string;
    born?: number;
};

export type IBook = {
    id: string;
    title: string;
    published: number;
    author: string;
    genres: string[];
};