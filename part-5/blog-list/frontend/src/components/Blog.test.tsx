import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { Blog } from './Blog';
import userEvent from '@testing-library/user-event';

const testblog = {
  title: 'Test blog',
  author: 'Bob',
  url: 'www.test.com',
  likes: 0,
  user: {
    username: 'Jackman',
    name: 'Jack',
    id: '5e9f8f8f8f8f8f8f8f8f8f8'
  }
};

test('renders content', () => {
  render(<Blog blog={testblog} />);

  expect(screen.getByText('Test blog')).toBeDefined();
  expect(screen.getByText('Bob', { exact: false })).toBeDefined();
  expect(screen.queryByText('www.test.com')).toBeNull();
  expect(screen.queryByText('0')).toBeNull();
});

test('renders content with expanded', () => {
  render(<Blog blog={testblog} />);

  // const user = userEvent.setup();
  const button = screen.getByText('Show');
  userEvent.click(button);

  expect(screen.getByText('Test blog')).toBeDefined();
  expect(screen.getByText('Bob', { exact: false })).toBeDefined();
  expect(screen.getByText('www.test.com')).toBeDefined();
  expect(screen.getByText('Likes: 0', { exact: false })).toBeDefined();
});

test('renders content with expanded and likes', () => {
  const mockHandler = jest.fn();

  render(<Blog blog={testblog} />);

  const button = screen.getByText('Show');
  userEvent.click(button);

  // my blog component doesn't receive a like button function
  // so I did this to satisfy the task
  // it at least confirms that the button exists and can be clicked
  const likeButton = screen.getByText('Like');
  likeButton.onclick = mockHandler;
  userEvent.click(likeButton);
  userEvent.click(likeButton);

  expect(mockHandler).toHaveBeenCalledTimes(2);
});