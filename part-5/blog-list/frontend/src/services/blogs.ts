import axios from 'axios';
import { BlogType, sanitizeBlog } from 'shared';
const baseUrl = '/api/blogs';

function getConfig() {
  const user = JSON.parse(localStorage.getItem('user') ?? '{}');
  
  return {
    headers: { Authorization: `bearer ${user.token}` },
  }
}

export async function getAllBlogs() {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
}

export type createBlogInfo = {
  title: string;
  author: string;
  url: string;
}

export async function createBlog(info: createBlogInfo) {
  const blog = {
    author: info.author,
    title: info.title,
    url: info.url
  }
  
  const request = axios.post(baseUrl, blog, getConfig());
  const response = await request;
  return response.data;
}

export function likeBlog(blog: BlogType) {
  const url = `${baseUrl}/${blog.id}`;
  console.log(url);
  return axios.put(url, sanitizeBlog({ ...blog, likes: blog.likes + 1 }));
}

export function deleteBlog(id: string) {
  const url = `${baseUrl}/${id}`;
  return axios.delete(url, getConfig());
}