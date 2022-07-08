import { CoursePart } from '../types/CoursePart';
import { Part } from './Part';

export function Content({ parts }: { parts: CoursePart[]; }) {
  return (
    <div className='parts'>
      {parts.map(part => <Part key={part.name} part={part} />)}
    </div>
  );
}