import { useEffect } from "react";
import { Login } from "./components/Login";
import { MainContent } from "./components/MainContent";
import { Notification } from "./components/Notification";
import { Toggle } from "./components/Toggle";
import { useLogin } from "./tools/LoginContext";


function App() {
  const { token, setUser } = useLogin();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') ?? '{}');
    setUser(user.username, user.token);
  }, []);

  return (
    <div className="App">
      <Notification />

      <Toggle visible={!token}>
        <Login />
      </Toggle>

      <Toggle visible={!!token}>
        <MainContent />
      </Toggle>
    </div>
  );
}

export default App;
