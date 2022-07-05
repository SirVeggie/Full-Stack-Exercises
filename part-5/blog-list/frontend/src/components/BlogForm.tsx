import { useState } from "react";
import { createBlog } from "../services/blogs";
import { useNotification } from "../tools/NotificationContext";
import { Toggle } from "./Toggle";

type BlogFormProps = {
  refresh?: () => void;
  onSubmit?: (data: {
    title: string;
    author: string;
    url: string;
  }) => void;
};

export function BlogForm({ refresh, onSubmit }: BlogFormProps) {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const { setNotification } = useNotification();

  const hide = (e: any) => {
    e.preventDefault();
    setVisible(false);
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  const show = () => {
    setVisible(true);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit?.({ title, author, url });
    createBlog({ title, author, url })
      .then(() => {
        setTitle('');
        setAuthor('');
        setUrl('');
        refresh?.();
        setNotification('Blog created', 'success');
        setVisible(false);
      }).catch(error => {
        setNotification(error.response.data.error, 'error');
      });
  };

  return (
    <div>
      <Toggle visible={!visible} animated>
        <button onClick={show}>Create new</button>
      </Toggle>

      <Toggle visible={visible} animated>
        <h2>Create Blog</h2>
        <form onSubmit={submit}>
          <label>Title<br />
            <input value={title} onChange={e => setTitle(e.target.value ?? '')} />
          </label>
          
          <label>Author<br />
            <input value={author} onChange={e => setAuthor(e.target.value ?? '')} />
          </label>
          
          <label>Url<br />
            <input value={url} onChange={e => setUrl(e.target.value ?? '')} />
          </label>
          
          <button type='submit'>Create</button>
          <button onClick={hide}>Cancel</button>
        </form>
      </Toggle>
    </div>
  );
}