import './App.css';
import { useEffect, useState, createContext, useContext } from "react";
import LiveClock from "./LiveClock";

const ThemeContext = createContext("light");

function DataFetcher() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

function ThemedComponent() {
  const theme = useContext(ThemeContext);
  return <p>{theme}</p>;
}


function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <>
      <h1>Data Fetching with useEffect basics</h1>
      <DataFetcher />
      <h1>Theme Context useContext intro</h1>
      {/* 3. Pass the state variable to the Provider */}
      <ThemeContext.Provider value={theme}>
        <button onClick={toggleTheme}>
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
        <ThemedComponent />
      </ThemeContext.Provider>
      <h1>Live Clock with useEffect cleanup</h1>
      <LiveClock />
    </>
  );
}

export default App;
