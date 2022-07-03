import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { BlogType } from 'shared';
import { deleteBlog, likeBlog } from '../services/blogs';
import { useNotification } from '../tools/NotificationContext';
import { Toggle } from './Toggle';

export type Blog = BlogType;

type BlogProps = {
  blog: Blog;
  refresh: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export function Blog({ blog, refresh }: BlogProps) {
  const [expanded, setExpanded] = useState(false);
  const { setNotification } = useNotification();
  const s = useStyles();

  const isAuthor = JSON.parse(localStorage.getItem('user') ?? '{}').username === (blog.user as any).username;

  const like = () => {
    likeBlog(blog)
      .then(() => {
        setNotification('Blog liked', 'success');
        refresh();
      }).catch(error => {
        setNotification(error.response.data.error, 'error');
      });
  };

  const del = () => {
    deleteBlog(blog.id ?? '')
      .then(() => {
        setNotification('Blog deleted', 'success');
        refresh();
      }).catch(error => {
        setNotification(error.response.data.error, 'error');
      });
  };

  return (
    <div className={s.base}>
      <div>
        <span>{blog.title}</span> by {blog.author}
      </div>
      <Toggle visible={expanded}>
        <div>{blog.url}</div>
        <span>likes: {blog.likes}</span>
        <button className={s.like} onClick={like}>Like</button>
        <div>Author: {blog.author}</div>
        <div>Uploader: {(blog.user as any).username}</div>
      </Toggle>
      <button className={s.toggle} onClick={() => setExpanded(!expanded)}>{expanded ? 'Hide' : 'Show'}</button>
      <Toggle visible={isAuthor}>
        <button className={s.delete} onClick={del}>Delete</button>
      </Toggle>
    </div>
  );
}

const useStyles = createUseStyles({
  base: {
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#f0f0f0',
    padding: '10px',
    borderRadius: '5px',


    '& span:first-child': {
      fontWeight: 600,
    }
  },

  like: { marginLeft: '10px' },
  toggle: { marginTop: '10px' },
  delete: { marginLeft: '10px' },
});