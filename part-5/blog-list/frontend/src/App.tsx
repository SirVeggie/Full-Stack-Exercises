import { useEffect } from "react";
import { Blogs } from "./components/Blogs";
import { Login } from "./components/Login";
import { Notification } from "./components/Notification";
import { useLogin } from "./tools/LoginContext";


function App() {
  const { token, setUser } = useLogin();
  
  useEffect(() => { 
    const user = JSON.parse(localStorage.getItem('user') ?? '{}');
    setUser(user.username, user.token);
  }, []);

  return (
    <div className="App">
      {token ? <button onClick={() => setUser('', '')}>Logout</button> : ''}
      <Notification />
      {token
        ? <Blogs />
        : <Login />
      }
    </div>
  );
}

export default App;
