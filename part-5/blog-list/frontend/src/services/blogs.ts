import axios from 'axios';
const baseUrl = '/api/blogs';

export async function getAllBlogs() {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
}

export type createBlogInfo = {
  title: string;
  author: string;
  url: string;
  username: string;
  token: string;
}

export async function createBlog(info: createBlogInfo) {
  const blog = {
    author: info.author,
    title: info.title,
    url: info.url
  }
  
  const config = {
    headers: { Authorization: `bearer ${info.token}` },
  }
  
  const request = axios.post(baseUrl, blog, config);
  const response = await request;
  return response.data;
}