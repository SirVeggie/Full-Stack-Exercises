import { createContext, useContext, useState } from 'react';

const NotificationContext = createContext({
  notification: {
    message: '',
    type: '',
    hidden: true
  },
  setNotification: (message: string, type: string) => { },
  setHidden: (state: boolean) => { }
});

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined)
    throw new Error('useNotification must be used within a NotificationProvider');
  return context;
}

export function NotificationProvider({ children }: { children: React.ReactNode; }) {
  const timer = useTimer();
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const [hidden, setHidden] = useState(true);

  const setNotification = (message: string, type: string) => {
    setMessage(message);
    setType(type);
    setHidden(false);
    clearNotification();
  };

  const clearNotification = () => {
    timer.start(5000, async () => {
      setHidden(true);
    });
  };

  return (
    <NotificationContext.Provider value={{ notification: { message, type, hidden }, setNotification, setHidden }}>
      {children}
    </NotificationContext.Provider>
  );
}

function useTimer() {
  const [timer, setTimer] = useState(null as any);

  const start = (duration: number, action: () => void | Promise<any>) => {
    clearTimeout(timer);
    setTimer(setTimeout(() => {
      action();
    }, duration));
  };

  const clear = () => {
    clearTimeout(timer);
  };

  return { start, clear };
}