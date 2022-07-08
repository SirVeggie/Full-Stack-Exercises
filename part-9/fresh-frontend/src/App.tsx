import { Content } from './components/Content';
import { Header } from './components/Header';
import { Total } from './components/Total';
import { courseParts } from './data/courseParts';

export function App() {
  const courseName = 'Half Stack application development';
  
  return (
    <div className='app'>
      <Header title={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
}
