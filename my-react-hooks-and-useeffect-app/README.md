# Day 4: Hooks and useEffect

## Overview
You’ll learn how to handle side effects like API calls, timers, and subscriptions.

## Step by step

### useEffect basics

```jsx
import { useEffect, useState } from 'react';

function DataFetcher() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```
The empty array means it runs once on mount.

### useContext intro

```jsx
const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedComponent />
    </ThemeContext.Provider>
  );
}

function ThemedComponent() {
  const theme = useContext(ThemeContext);
  return <p>{theme}</p>;
}
```

## Quiz (Day 4)

*   What is a side effect?
*   When does useEffect run?
*   What does the dependency array control?
*   What problem does context solve?
*   Can hooks be used inside loops?

## Daily Task

*   Create a live clock using `useEffect` and clean up the interval.

## Interview Reminder (Day 4)

Be ready to explain:

*   `useEffect` lifecycle behavior
*   Dependency array meaning


# React Hooks and useEffect

## 1. What is a side effect?

A **side effect** is any operation that affects something outside the component's rendering process.

Examples of side effects:

*   Fetching data from an API
*   Setting up timers or intervals
*   Directly manipulating the DOM
*   Subscribing to events
*   Reading/writing to `localStorage`
*   Logging to console

### Example:

```jsx
function ProfilePage() {
  const [user, setUser] = useState(null);
  
  // ❌ WRONG - Side effect directly in component body
  fetch("/api/user")  // This runs on EVERY render!
    .then(res => res.json())
    .then(data => setUser(data));
  
  return <h1>{user?.name}</h1>;
}

// ✅ CORRECT - Side effects go inside useEffect
function ProfilePage() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Side effect inside useEffect
    fetch("/api/user")
      .then(res => res.json())
      .then(data => setUser(data));
  }, []); // Runs only once
  
  return <h1>{user?.name}</h1>;
}
```

### More examples of side effects:

```jsx
function SideEffectExamples() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // Side effect: Update document title
    document.title = `Count: ${count}`;
  }, [count]);
  
  useEffect(() => {
    // Side effect: Set up a timer
    const timer = setInterval(() => {
      console.log("Timer running...");
    }, 1000);
    
    // Cleanup function (runs when component unmounts)
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    // Side effect: Save to localStorage
    localStorage.setItem("count", count);
  }, [count]);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

## 2. When does `useEffect` run?

`useEffect` runs **after the component renders to the screen**. The exact timing depends on the **dependency array**.

### Three scenarios:

#### Scenario 1: Runs after EVERY render (no dependency array)

```jsx
function EveryRender() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log("Runs after EVERY render!");
  }); // No dependency array
  
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
// Logs: After initial render, then after every button click
```

#### Scenario 2: Runs only ONCE after initial render (empty array)

```jsx
function OnceOnMount() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    console.log("Runs ONCE when component mounts");
    
    // Perfect for API calls
    fetch("/api/data")
      .then(res => res.json())
      .then(data => setData(data));
  }, []); // Empty array = run once
  
  return <div>{data?.title}</div>;
}
```

#### Scenario 3: Runs when specific values change (with dependencies)

```jsx
function SearchResults() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    console.log("Runs when query changes");
    
    if (query) {
      fetch(`/api/search?q=${query}`)
        .then(res => res.json())
        .then(data => setResults(data));
    }
  }, [query]); // Runs when 'query' changes
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
}
```

### Complete lifecycle example:

```jsx
function LifecycleDemo({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    console.log("1. Component mounted or userId changed");
    
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
    
    // Cleanup function
    return () => {
      console.log("2. Cleanup before next effect or unmount");
    };
  }, [userId]);
  
  return <h1>{user?.name}</h1>;
}

// Order of execution:
// 1. Component renders
// 2. useEffect runs
// 3. User clicks, userId changes
// 4. Cleanup function runs
// 5. useEffect runs again with new userId
```

## 3. What does the dependency array control?

The **dependency array** controls when the effect re-runs. React compares the values and only re-runs if they changed.

### Example with different dependencies:

```jsx
function DependencyExample() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [city, setCity] = useState("");
  
  // Runs when 'name' changes
  useEffect(() => {
    console.log(`Name changed to: ${name}`);
  }, [name]);
  
  // Runs when 'age' OR 'city' changes
  useEffect(() => {
    console.log(`Age: ${age}, City: ${city}`);
  }, [age, city]);
  
  // Runs on every render
  useEffect(() => {
    console.log("Any state changed!");
  }); // No dependency array
  
  return (
    <div>
      <input onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input onChange={(e) => setAge(e.target.value)} placeholder="Age" />
      <input onChange={(e) => setCity(e.target.value)} placeholder="City" />
    </div>
  );
}
```

### Real-world example - Chat app:

```jsx
function ChatRoom({ roomId, userId }) {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    // This effect depends on roomId
    console.log(`Joining room: ${roomId}`);
    
    // Connect to chat room
    const socket = connectToRoom(roomId);
    
    socket.on("message", (msg) => {
      setMessages(prev => [...prev, msg]);
    });
    
    // Cleanup when roomId changes or component unmounts
    return () => {
      console.log(`Leaving room: ${roomId}`);
      socket.disconnect();
    };
  }, [roomId]); // Re-run when roomId changes
  
  // Separate effect for user status
  useEffect(() => {
    console.log(`User ${userId} is active`);
    updateUserStatus(userId, "online");
    
    return () => {
      updateUserStatus(userId, "offline");
    };
  }, [userId]); // Re-run when userId changes
  
  return (
    <div>
      <h2>Room: {roomId}</h2>
      {messages.map((msg, i) => <p key={i}>{msg}</p>)}
    </div>
  );
}
```

### ⚠️ Common mistake - Missing dependencies:

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      console.log(count); // Uses 'count'
      setCount(count + 1); // ❌ Will always use the initial count!
    }, 1000);
    
    return () => clearInterval(timer);
  }, []); // ❌ Missing 'count' in dependencies!
  
  // ✅ BETTER - Use functional update
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => prev + 1); // No dependency on count needed
    }, 1000);
    
    return () => clearInterval(timer);
  }, []); // ✅ Empty array is fine now
  
  return <p>Count: {count}</p>;
}
```

## 4. What problem does context solve?

Context solves **prop drilling** - the problem of passing props through many component levels just to reach a deeply nested component.

### The Problem - Prop Drilling:

```jsx
// ❌ PROP DRILLING - passing props through many levels

function App() {
  const [user, setUser] = useState({ name: "John", theme: "dark" });
  
  return <Dashboard user={user} />;
}

function Dashboard({ user }) {
  return <Sidebar user={user} />;  // Just passing through
}

function Sidebar({ user }) {
  return <UserProfile user={user} />;  // Just passing through
}

function UserProfile({ user }) {
  return <Avatar user={user} />;  // Just passing through
}

function Avatar({ user }) {
  return <img alt={user.name} />;  // Finally using it!
}
```

### The Solution - Context:

```jsx
import { createContext, useContext, useState } from 'react';

// 1. Create Context
const UserContext = createContext();

// 2. Create Provider Component
function App() {
  const [user, setUser] = useState({ name: "John", theme: "dark" });
  
  return (
    <UserContext.Provider value={user}>
      <Dashboard />
    </UserContext.Provider>
  );
}

// 3. Components no longer need to pass props
function Dashboard() {
  return <Sidebar />;  // No props!
}

function Sidebar() {
  return <UserProfile />;  // No props!
}

function UserProfile() {
  return <Avatar />;  // No props!
}

// 4. Access context directly where needed
function Avatar() {
  const user = useContext(UserContext);  // ✅ Direct access!
  
  return (
    <div>
      <img alt={user.name} />
      <p>{user.name}</p>
    </div>
  );
}
```

### Real-world example - Theme Context:

```jsx
import { createContext, useContext, useState } from 'react';

// Create context
const ThemeContext = createContext();

// Provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for easier access
function useTheme() {
  return useContext(ThemeContext);
}

// App
function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <Content />
    </ThemeProvider>
  );
}

// Any component can access theme
function Navbar() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <nav style={{ background: theme === 'dark' ? '#333' : '#fff' }}>
      <button onClick={toggleTheme}>
        Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
      </button>
    </nav>
  );
}

function Content() {
  const { theme } = useTheme();
  
  return (
    <div style={{ background: theme === 'dark' ? '#000' : '#fff' }}>
      <p>Current theme: {theme}</p>
    </div>
  );
}
```

### Multiple contexts example:

```jsx
function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <LanguageProvider>
          <Dashboard />
        </LanguageProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

function Dashboard() {
  const user = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  
  return <div>Hello {user.name} in {language}!</div>;
}
```

## 5. Can hooks be used inside loops?

No! ❌ Hooks cannot be used inside loops, conditions, or nested functions.

### ❌ WRONG - Hooks in loops/conditions:

```jsx
function BadComponent({ items }) {
  // ❌ WRONG - Hook inside loop
  items.forEach(item => {
    const [count, setCount] = useState(0);  // ❌ ERROR!
  });
  
  // ❌ WRONG - Hook inside condition
  if (items.length > 0) {
    const [selected, setSelected] = useState(null);  // ❌ ERROR!
  }
  
  // ❌ WRONG - Hook inside nested function
  const handleClick = () => {
    const [clicked, setClicked] = useState(false);  // ❌ ERROR!
  };
  
  return <div>Bad component</div>;
}
```

### ✅ CORRECT - Hooks at top level:

```jsx
function GoodComponent({ items }) {
  // ✅ CORRECT - All hooks at the top level
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState(null);
  const [clicked, setClicked] = useState(false);
  
  // Logic can be inside functions, but not hook declarations
  const handleClick = () => {
    setClicked(true);  // ✅ OK - Using the hook
  };
  
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <button onClick={handleClick}>{item.name}</button>
        </div>
      ))}
    </div>
  );
}
```

### Real-world example - Multiple items with state:

```jsx
// ❌ WRONG approach
function TodoList({ todos }) {
  return (
    <div>
      {todos.map(todo => {
        const [isEditing, setIsEditing] = useState(false);  // ❌ Hook in loop!
        return <TodoItem todo={todo} />;
      })}
    </div>
  );
}

// ✅ CORRECT approach - Move state to child component
function TodoList({ todos }) {
  return (
    <div>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />  // ✅ Each has own component
      ))}
    </div>
  );
}

function TodoItem({ todo }) {
  // ✅ Hook at top level of component
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div>
      {isEditing ? (
        <input defaultValue={todo.text} />
      ) : (
        <span>{todo.text}</span>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </div>
  );
}
```

### Another example - Managing array of states:

```jsx
function ShoppingCart() {
  // ✅ Use object/array state instead of multiple hooks in loop
  const [items, setItems] = useState([
    { id: 1, name: 'Laptop', quantity: 1 },
    { id: 2, name: 'Phone', quantity: 2 }
  ]);
  
  const updateQuantity = (id, newQuantity) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <input 
            type="number"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
          />
        </div>
      ))}
    </div>
  );
}
```

## 🎯 Quick Summary:

*   **Side effects**: Operations outside rendering (API calls, timers, DOM manipulation) → use `useEffect`
*   **`useEffect` runs**: After render, timing controlled by dependency array
*   **Dependency array**: Controls when effect re-runs (empty = once, with deps = when they change)
*   **Context solves**: Prop drilling - passing data through many component levels
*   **Hooks in loops**: ❌ NO! Always call hooks at the top level only
