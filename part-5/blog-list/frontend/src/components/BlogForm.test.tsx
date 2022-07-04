import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { BlogForm } from './BlogForm';
import userEvent from '@testing-library/user-event';

test('form submits with correct data', () => {
  const mockHandler = jest.fn();

  render(<BlogForm onSubmit={mockHandler} />);

  const show = screen.getByText('Create new');
  userEvent.click(show);
  
  const titleInput = screen.getByLabelText('Title');
  const authorInput = screen.getByLabelText('Author');
  const urlInput = screen.getByLabelText('Url');

  userEvent.type(titleInput, 'Test blog');
  userEvent.type(authorInput, 'Bob');
  userEvent.type(urlInput, 'www.test.com');

  const button = screen.getByText('Create');
  userEvent.click(button);

  expect(mockHandler).toHaveBeenCalledTimes(1);
  expect(mockHandler).toHaveBeenCalledWith({
    title: 'Test blog',
    author: 'Bob',
    url: 'www.test.com'
  });
});