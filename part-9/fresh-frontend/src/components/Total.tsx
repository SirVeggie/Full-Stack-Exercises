import { CoursePart } from '../types/CoursePart';

export function Total({ parts }: { parts: CoursePart[] }) {
  const total = parts.reduce((acc, part) => acc + part.exerciseCount, 0);
  return <p>Number of exercises {total}</p>;
}