import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import { useLogin } from '../tools/LoginContext';

export function Navigation() {
  const { setUser } = useLogin();
  const s = useStyle();
  //{token ? <button onClick={() => setUser('', '')}>Logout</button> : ''}

  return (
    <div className={s.base}>
      <Link className={s.button} to='/'>Home</Link>
      <Link className={s.button} to='/users'>Users</Link>
      <button className={s.button} onClick={() => setUser('', '')}>Logout</button>
    </div>
  );
}

const useStyle = createUseStyles({
  base: {
    display: 'flex',
    // justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem',
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #ccc',
    borderRadius: '0 0 5px 5px',
    
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
  },
  
  button: {
    textDecoration: 'none',
    color: '#000',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '0.5rem',
    marginLeft: '0.5rem',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontFamily: 'sans-serif',
    
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
    
    '&:active': {
      backgroundColor: '#e0e0e0',
    }
  }
});