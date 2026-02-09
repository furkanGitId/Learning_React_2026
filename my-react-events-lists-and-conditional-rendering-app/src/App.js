import './App.css';
import { useState } from 'react';
import TodoList from './TodoList';

function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return <button onClick={handleClick}>Clicked {count} times</button>;
}

function ListComponent() {
  const items = ["Apple", "Banana", "Cherry"];

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

function ConditionalRenderingComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? (
        <p>Welcome back</p>
      ) : (
        <button onClick={() => setIsLoggedIn(true)}>Login</button>
      )}
    </div>
  );
}

function App() {
  return (
    <>
      <h1>Event handling</h1>
      <Counter />
      <h1>Rendering lists</h1>
      <ListComponent />
      <h1>Conditional rendering</h1>
      <ConditionalRenderingComponent />
      <h1>To-Do List</h1>
      <TodoList />
    </>
  );
}

export default App;
