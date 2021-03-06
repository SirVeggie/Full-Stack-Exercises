import { createUseStyles } from 'react-jss';
import { useNotification } from '../tools/NotificationContext';

export function Notification() {
  const { notification, setHidden } = useNotification();
  const styles = useStyles();
  
  const close = () => {
    setHidden(true);
  };

  return (
    <div className={`${styles.base} ${notification.hidden && 'hidden'}`}>
      <div className={`${styles.notification} ${notification.type}`}>
        <span>{notification.message}</span>
        <button className={styles.button} onClick={close}>X</button>
      </div>
    </div>
  );
}

const useStyles = createUseStyles({
  base: {
    pointerEvents: 'none',
    position: 'fixed',
    zIndex: 100,
    display: 'flex',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    padding: '1rem',
  },

  notification: {
    fontSize: '1.5rem',
    backgroundColor: '#f0f0f0b0',
    borderRadius: '0.5rem',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#a0a0a040',
    padding: '1rem 1rem 1rem 1rem',
    transition: 'all 350ms ease-out',
    display: 'flex',
    transform: 'translateY(1rem)',
    
    '& span': {
      marginRight: '1rem',
    },

    '$base.hidden &': {
      opacity: 0,
      transform: 'translateY(0rem)',
    },

    '&.success': {
      backgroundColor: '#a0f0a0b0',
      borderColor: '#80c08040',
      color: '#008000',
    },

    '&.error': {
      backgroundColor: '#f0a0a0b0',
      borderColor: '#c0808040',
      color: '#ff0000',
    },
  },

  button: {
    pointerEvents: 'initial',
    // backgroundColor: '#f0f0f040',
    backgroundColor: '#0000000a',
    color: '#2f2f2f40',
    cursor: 'pointer',
    border: '1px solid #a0a0a040',
    borderRadius: '0.2rem',
    padding: '0rem 0.7rem',
    
    '&:hover': {
      backgroundColor: '#f0f0f0d0',
      color: '#2f2f2fd0',
    },
    
    '&:active': {
      backgroundColor: '#e0e0e0d0',
      color: '#afafafd0',
    }
  }
});