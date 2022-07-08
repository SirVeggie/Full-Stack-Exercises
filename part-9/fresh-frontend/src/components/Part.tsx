import { CoursePart } from '../types/CoursePart';

export function Part({ part }: { part: CoursePart; }) {
  return <div>{renderPart(part)}</div>;
}

function renderPart(part: CoursePart) {
  switch (part.type) {
    
    case 'normal':
      return (<>
        <div className='title'>{part.name}</div>
        exercises: {part.exerciseCount}
        <br />
        {part.description}
      </>);
    
    case 'groupProject':
      return (<>
        <div className='title'>{part.name}</div>
        exercises: {part.exerciseCount}
        <br />
        projects: {part.groupProjectCount}
      </>);
      
    case 'submission':
      return (<>
        <div className='title'>{part.name}</div>
        exercises: {part.exerciseCount}
        <br />
        {part.description}
        <br />
        submission link: {part.exerciseSubmissionLink}
      </>);
      
    case 'special':
      return (<>
        <div className='title'>{part.name}</div>
        exercises: {part.exerciseCount}
        <br />
        {part.description}
        <br />
        requirements: {part.requirements.join(', ')}
        <br />
      </>);
      
    default:
      return assertNever(part);
  }
}

function assertNever(x: never): never {
  throw new Error('Unexpected object: ' + x);
}