import { BlogType } from 'shared';

export type Blog = BlogType;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export function Blog({ blog }: { blog: BlogType }) {
  return (
    <div>
      {blog.title} {blog.author}
    </div>
  );
}
