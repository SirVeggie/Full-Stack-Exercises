import { useEffect, useState } from 'react';
import { Blog } from './Blog';
import { getAllBlogs } from '../services/blogs';
import { BlogForm } from './BlogForm';
import { useLogin } from '../tools/LoginContext';

export function Blogs() {
  const [blogs, setBlogs] = useState([] as Blog[]);
  const { username } = useLogin();
  
  const refresh = () => {
    getAllBlogs().then(blogs => setBlogs(blogs));
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div>
      <h2>Welcome {username}</h2>
      <BlogForm refresh={refresh} />
      <h2>Blogs</h2>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
}