import { useState } from "react";
import { createBlog } from "../services/blogs";
import { useLogin } from "../tools/LoginContext";
import { useNotification } from "../tools/NotificationContext";
import { Toggle } from "./Toggle";

type BlogFormProps = {
  refresh: () => void;
};

export function BlogForm({ refresh }: BlogFormProps) {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const { setNotification } = useNotification();
  const { username, token } = useLogin();

  const hide = () => {
    setVisible(false);
    setTitle('');
    setAuthor('');
    setUrl('');
  };
  
  const show = () => {
    setVisible(true);
  }
  
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createBlog({ title, author, url, username, token })
      .then(() => {
        setTitle('');
        setAuthor('');
        setUrl('');
        refresh();
        setNotification('Blog created', 'success');
      }).catch(error => {
        setNotification(error.response.data.error, 'error');
      });
  };

  return (
    <div>
      <Toggle visible={!visible}>
        <button onClick={show}>Create new</button>
      </Toggle>

      <Toggle visible={visible}>
        <h2>Create Blog</h2>
        <form onSubmit={onSubmit}>
          Title
          <input value={title} onChange={e => setTitle(e.target.value ?? '')} />
          Author
          <input value={author} onChange={e => setAuthor(e.target.value ?? '')} />
          Url
          <input value={url} onChange={e => setUrl(e.target.value ?? '')} />
          <button type='submit'>Create</button>
          <button onClick={hide}>Cancel</button>
        </form>
      </Toggle>
    </div>
  );
}