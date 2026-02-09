# Day 3: Events, Lists, and Conditional Rendering

## Overview
You’ll learn how users interact with React apps and how to render dynamic data.

## Step by step

### Event handling

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}
```

### Rendering lists

```jsx
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
```
Keys help React track list items.

### Conditional rendering

```jsx
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? <p>Welcome back</p> : <button onClick={() => setIsLoggedIn(true)}>Login</button>}
    </div>
  );
}
```

## Quiz (Day 3)

*   How do you attach an event handler?
*   Why is key important in lists?
*   What method is used to render arrays?
*   Name two ways to conditionally render UI
*   Are React events the same as native DOM events?

## Daily Task

Build a basic to-do list:

*   Add tasks
*   Remove tasks
*   Store tasks in state

## Interview Reminder (Day 3)

Prepare answers for:

*   Why keys are important
*   How React handles events



# React Event Handling and List Rendering

## 1. How do you attach an event handler?

In React, you attach event handlers using **camelCase** attributes (like `onClick`, `onChange`) and pass a **function** (not a string).

### Example:

```jsx
function EventExample() {
  // Method 1: Using arrow function inline
  return (
    <button onClick={() => alert('Clicked!')}>
      Click Me
    </button>
  );
}

// Method 2: Define function separately (better practice)
function BetterExample() {
  const handleClick = () => {
    alert('Button clicked!');
  };
  
  return <button onClick={handleClick}>Click Me</button>;
  //                      ↑ No parentheses! Pass the function itself
}

// Method 3: With parameters
function GreetingButton() {
  const greet = (name) => {
    alert(`Hello, ${name}!`);
  };
  
  return (
    <button onClick={() => greet('John')}>
      Say Hello
    </button>
  );
}
```

### Common event handlers

```jsx
function FormExample() {
  const [text, setText] = useState('');
  
  const handleChange = (event) => {
    setText(event.target.value);  // Get input value from event
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();  // Prevent page reload
    alert(`You typed: ${text}`);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={text}
        onChange={handleChange}
        onFocus={() => console.log('Input focused!')}
        onBlur={() => console.log('Input lost focus!')}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### ❌ Common mistakes:

```jsx
// WRONG - Don't call the function immediately
<button onClick={handleClick()}>Click</button>  // ❌ Runs on render!

// CORRECT - Pass the function reference
<button onClick={handleClick}>Click</button>    // ✅ Runs on click
```

## 2. Why is `key` important in lists?

The `key` prop helps React identify which items have changed, been added, or removed. It improves performance and prevents bugs.

### Without `key` (causes problems):

```jsx
function BadList() {
  const fruits = ['Apple', 'Banana', 'Orange'];
  
  return (
    <ul>
      {fruits.map(fruit => (
        <li>{fruit}</li>  // ⚠️ Warning: missing key!
      ))}
    </ul>
  );
}
```

### With `key` (correct):

```jsx
function GoodList() {
  const fruits = ['Apple', 'Banana', 'Orange'];
  
  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>  // ✅ Has key
      ))}
    </ul>
  );
}
```

### Best practice - Use unique IDs:

```jsx
function TodoList() {
  const todos = [
    { id: 1, text: 'Buy milk' },
    { id: 2, text: 'Walk dog' },
    { id: 3, text: 'Study React' }
  ];
  
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>  // ✅ Use unique ID
      ))}
    </ul>
  );
}
```

### Why it matters - Example with state:

```jsx
function TaskList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Task 1', done: false },
    { id: 2, text: 'Task 2', done: false }
  ]);
  
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };
  
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>  {/* Key helps React track which checkbox belongs to which task */}
          <input 
            type="checkbox" 
            checked={task.done}
            onChange={() => toggleTask(task.id)}
          />
          {task.text}
        </li>
      ))}
    </ul>
  );
}
```

### ⚠️ Don't use index as key if list can change:

```jsx
// ❌ BAD - if you add/remove/reorder items
{items.map((item, index) => <li key={index}>{item}</li>)}

// ✅ GOOD - use stable unique ID
{items.map(item => <li key={item.id}>{item.name}</li>)}
```

## 3. What method is used to render arrays?

The `.map()` method is used to render arrays in React.

### Basic example:

```jsx
function NumberList() {
  const numbers = [1, 2, 3, 4, 5];
  
  return (
    <ul>
      {numbers.map(num => (
        <li key={num}>{num}</li>
      ))}
    </ul>
  );
}
```

### Real-world example - Product list:

```jsx
function ProductList() {
  const products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Phone', price: 699 },
    { id: 3, name: 'Tablet', price: 399 }
  ];
  
  return (
    <div>
      {products.map(product => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
```

### With index (when you need it):

```jsx
function StudentList() {
  const students = ['Alice', 'Bob', 'Charlie'];
  
  return (
    <ol>
      {students.map((student, index) => (
        <li key={index}>
          Student #{index + 1}: {student}
        </li>
      ))}
    </ol>
  );
}
```

### Creating components from array:

```jsx
function UserCard({ name, email }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
}

function UserList() {
  const users = [
    { id: 1, name: 'John', email: 'john@example.com' },
    { id: 2, name: 'Sarah', email: 'sarah@example.com' }
  ];
  
  return (
    <div>
      {users.map(user => (
        <UserCard 
          key={user.id}
          name={user.name}
          email={user.email}
        />
      ))}
    </div>
  );
}
```

## 4. Name two ways to conditionally render UI

### Method 1: Ternary Operator (`? :`)

```jsx
function LoginButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back!</h1>
      ) : (
        <h1>Please sign in</h1>
      )}
      
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>
    </div>
  );
}
```

### Method 2: Logical AND (`&&`)

```jsx
function Notification() {
  const [hasMessage, setHasMessage] = useState(true);
  const messageCount = 5;
  
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Only shows if hasMessage is true */}
      {hasMessage && (
        <div className="notification">
          You have {messageCount} new messages!
        </div>
      )}
      
      {/* Another example */}
      {messageCount > 0 && <span>📬 {messageCount}</span>}
    </div>
  );
}
```

### Bonus methods:

#### Method 3: If/Else statements (outside JSX):

```jsx
function UserGreeting({ user }) {
  let greeting;
  
  if (user.isPremium) {
    greeting = <h1>Welcome, Premium Member {user.name}! ⭐</h1>;
  } else if (user.isLoggedIn) {
    greeting = <h1>Hello, {user.name}!</h1>;
  } else {
    greeting = <h1>Welcome, Guest!</h1>;
  }
  
  return <div>{greeting}</div>;
}
```

#### Method 4: Switch statement:

```jsx
function StatusBadge({ status }) {
  let badge;
  
  switch(status) {
    case 'success':
      badge = <span className="green">✓ Success</span>;
      break;
    case 'error':
      badge = <span className="red">✗ Error</span>;
      break;
    case 'pending':
      badge = <span className="yellow">⏳ Pending</span>;
      break;
    default:
      badge = <span>Unknown</span>;
  }
  
  return <div>{badge}</div>;
}
```

### Real-world combined example:

```jsx
function ShoppingCart() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <div>
      <h1>Shopping Cart</h1>
      
      {/* Show loading spinner */}
      {isLoading && <p>Loading...</p>}
      
      {/* Show empty message or items */}
      {!isLoading && items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
      
      {/* Show checkout button only if items exist */}
      {items.length > 0 && (
        <button>Checkout ({items.length} items)</button>
      )}
    </div>
  );
}
```

## 5. Are React events the same as native DOM events?

No! React events are **SyntheticEvents** - a wrapper around native browser events.

### Key differences:

1.  **Naming convention:**

    ```jsx
    // Native DOM (HTML)
    <button onclick="handleClick()">Click</button>  // lowercase

    // React
    <button onClick={handleClick}>Click</button>    // camelCase
    ```

2.  **How you pass handlers:**

    ```jsx
    // Native DOM
    <button onclick="alert('Hi')">Click</button>    // String

    // React
    <button onClick={() => alert('Hi')}>Click</button>  // Function
    ```

3.  **Preventing default:**

    ```jsx
    // Native DOM
    <a href="#" onclick="return false;">Link</a>

    // React
    function Link() {
      const handleClick = (event) => {
        event.preventDefault();  // Must explicitly call this
        console.log('Link clicked');
      };
      
      return <a href="#" onClick={handleClick}>Link</a>;
    }
    ```

### Practical example showing SyntheticEvent:

```jsx
function FormExample() {
  const handleSubmit = (event) => {
    event.preventDefault();  // SyntheticEvent method
    
    // These work the same as native events
    console.log(event.target);        // The form element
    console.log(event.type);          // 'submit'
    console.log(event.currentTarget); // Element handler is attached to
    
    // You can access native event if needed
    console.log(event.nativeEvent);
  };
  
  const handleInput = (event) => {
    console.log(event.target.value);  // Get input value
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        onChange={handleInput}
        onKeyDown={(e) => console.log('Key pressed:', e.key)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Common React event handlers:

```jsx
function EventHandlers() {
  return (
    <div>
      {/* Mouse events */}
      <button onClick={() => {}}>Click</button>
      <div onMouseEnter={() => {}}>Hover me</div>
      <div onMouseLeave={() => {}}>Leave me</div>
      
      {/* Form events */}
      <input onChange={(e) => {}} />
      <form onSubmit={(e) => {}} />
      <input onFocus={() => {}} />
      <input onBlur={() => {}} />
      
      {/* Keyboard events */}
      <input onKeyDown={(e) => {}} />
      <input onKeyUp={(e) => {}} />
      <input onKeyPress={(e) => {}} />
      
      {/* Other events */}
      <div onScroll={() => {}} />
      <input onCopy={() => {}} />
      <input onPaste={() => {}} />
    </div>
  );
}
```

### 🎯 Quick Summary:

*   **Event handlers**: Use camelCase (`onClick`) and pass functions
*   **Key prop**: Helps React track list items (use unique IDs)
*   **Render arrays**: Use `.map()` method
*   **Conditional rendering**: Ternary (`? :`) and AND (`&&`) operators
*   **React events**: SyntheticEvents (similar but not identical to native DOM events)
