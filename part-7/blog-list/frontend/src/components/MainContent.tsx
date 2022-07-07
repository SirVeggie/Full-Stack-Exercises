import { Route, Routes } from 'react-router-dom';
import { Blogs } from './Blogs';
import { Navigation } from './Navigation';
import { Users } from './Users';

export function MainContent() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </>
  );
}