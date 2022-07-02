import { Blog } from '../models/blog';
import { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes, testBlogs } from '../utils/list_helper';

test('dummy returns one', () => {
    const blogs: Blog[] = [];

    const result = dummy(testBlogs);
    expect(result).toBe(1);
});

describe('total likes', () => {
    test('of empty list is zero', () => {
        const result = totalLikes([]);
        expect(result).toBe(0);
    });

    test('when list has only one blog equals the likes of that', () => {
        const result = totalLikes(testBlogs.slice(0, 1));
        expect(result).toBe(testBlogs[0].likes);
    });

    test('of a bigger list is calculated right', () => {
        const result = totalLikes(testBlogs);
        expect(result).toBe(36);
    });
});

describe('favorite blog', () => {
    test('of empty list is undefined', () => {
        const result = favoriteBlog([]);
        expect(result).toBe(undefined);
    });

    test('when list has only one blog equals that', () => {
        const result = favoriteBlog(testBlogs.slice(0, 1));
        expect(result).toEqual(testBlogs[0]);
    });

    test('of a bigger list is calculated right', () => {
        const result = favoriteBlog(testBlogs);
        expect(result).toEqual(testBlogs[2]);
    });
});

describe('most blogs', () => {
    test('of empty list is undefined', () => {
        const result = mostBlogs([]);
        expect(result).toBe(undefined);
    });

    test('when list has only one blog equals that', () => {
        const result = mostBlogs(testBlogs.slice(0, 1));
        expect(result).toEqual({author: testBlogs[0].author, blogs: 1});
    });

    test('of a bigger list is calculated right', () => {
        const result = mostBlogs(testBlogs);
        expect(result).toEqual({author: 'Robert C. Martin', blogs: 3});
    });
});

describe('most likes', () => {
    test('of empty list is undefined', () => {
        const result = mostLikes([]);
        expect(result).toBe(undefined);
    });

    test('when list has only one blog equals that', () => {
        const result = mostLikes(testBlogs.slice(0, 1));
        expect(result).toEqual({author: testBlogs[0].author, likes: testBlogs[0].likes});
    });

    test('of a bigger list is calculated right', () => {
        const result = mostLikes(testBlogs);
        expect(result).toEqual({author: 'Edsger W. Dijkstra', likes: 17});
    });
});
