# React Props and State: A Comprehensive Guide

# Day 2: Props and State

## Overview
Today you’ll learn how data flows in React using props and how components manage their own data using state.

## Step by step

### Props
Props are inputs passed to components.

```jsx
function HelloWorld(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return <HelloWorld name="Alice" />;
}
```

Props are read-only.

### State with useState
State stores data that can change.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### Combining props and state

```jsx
function App() {
  const [message, setMessage] = useState('Hello');

  return <HelloWorld name={message} />;
}
```

## 1. What are props?

**Props** (short for "properties") are arguments passed to components, like parameters to a function. They let you pass data from a parent component to a child component.

### Example:

```jsx
// Parent component passing props
function App() {
  return (
    <div>
      <WelcomeMessage name="John" age={25} />
      <WelcomeMessage name="Sarah" age={30} />
    </div>
  );
}

// Child component receiving props
function WelcomeMessage(props) {
  return (
    <div>
      <h1>Hello, {props.name}!</h1>
      <p>You are {props.age} years old.</p>
    </div>
  );
}

// Or using destructuring (cleaner way)
function WelcomeMessage({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
    </div>
  );
}
```

## 2. Can props be modified inside a component?

**No!** Props are **READ-ONLY**. You cannot modify props inside a component.

### Wrong ❌:

```jsx
function Product({ price }) {
  // This will cause an error!
  price = price + 10;  // ❌ Cannot modify props
  
  return <p>Price: ${price}</p>;
}
```

### Right ✅:

```jsx
function Product({ price }) {
  // If you need to modify it, use state instead
  const [finalPrice, setFinalPrice] = useState(price);
  
  const addTax = () => {
    setFinalPrice(finalPrice + 10);  // ✅ Modifying state, not props
  };
  
  return (
    <div>
      <p>Original: ${price}</p>
      <p>Final: ${finalPrice}</p>
      <button onClick={addTax}>Add Tax</button>
    </div>
  );
}
```

> **Think of it like this:** Props are like a gift someone gives you - you can use it, but you can't change what they gave you!

## 3. What does useState return?

`useState` returns an array with exactly 2 items:
1. The **current state value**
2. A **function to update** that value

### Example:

```jsx
import { useState } from 'react';

function Counter() {
  // useState returns [currentValue, updateFunction]
  const [count, setCount] = useState(0);
  //     ↑         ↑              ↑
  //  current  updater      initial value
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### Another example with different data types:

```jsx
function UserForm() {
  const [name, setName] = useState('');           // String
  const [age, setAge] = useState(0);              // Number
  const [isActive, setIsActive] = useState(true); // Boolean
  const [hobbies, setHobbies] = useState([]);     // Array
  
  return (
    <div>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <p>Name: {name}</p>
    </div>
  );
}
```

## 4. Why should state not be updated directly?

Because React won't know the state changed and won't re-render your component!

### Wrong ❌:

```jsx
function TodoList() {
  const [todos, setTodos] = useState(['Buy milk', 'Walk dog']);
  
  const addTodo = () => {
    todos.push('New todo');  // ❌ WRONG! Directly modifying state
    // Component won't re-render - React doesn't detect this change!
  };
  
  return (
    <div>
      {todos.map(todo => <p>{todo}</p>)}
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
}
```

### Right ✅:

```jsx
function TodoList() {
  const [todos, setTodos] = useState(['Buy milk', 'Walk dog']);
  
  const addTodo = () => {
    // ✅ CORRECT! Create new array and use setState
    setTodos([...todos, 'New todo']);
    // React detects the change and re-renders!
  };
  
  return (
    <div>
      {todos.map(todo => <p key={todo}>{todo}</p>)}
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
}
```

### Another example with objects:

```jsx
function UserProfile() {
  const [user, setUser] = useState({ name: 'John', age: 25 });
  
  const updateAge = () => {
    // ❌ WRONG
    user.age = 26;
    
    // ✅ CORRECT - create new object
    setUser({ ...user, age: 26 });
  };
  
  return <p>{user.name} is {user.age}</p>;
}
```

## 5. When would you use props instead of state?

- **Use Props when:** Data comes from a parent component and doesn't need to change within the child.
- **Use State when:** Data needs to change within the component itself (like user input, toggles, etc.).

### Example comparing both:

```jsx
// PROPS EXAMPLE - Data comes from parent, child just displays it
function ParentComponent() {
  return (
    <div>
      <ProductCard 
        name="Laptop" 
        price={999} 
        inStock={true} 
      />
    </div>
  );
}

function ProductCard({ name, price, inStock }) {
  // These are props - just display them, don't change them
  return (
    <div>
      <h2>{name}</h2>
      <p>${price}</p>
      <p>{inStock ? 'In Stock' : 'Out of Stock'}</p>
    </div>
  );
}

// STATE EXAMPLE - Data changes within the component
function ShoppingCart() {
  // This changes when user clicks, so use state
  const [itemCount, setItemCount] = useState(0);
  
  return (
    <div>
      <p>Items: {itemCount}</p>
      <button onClick={() => setItemCount(itemCount + 1)}>
        Add to Cart
      </button>
    </div>
  );
}
```

### COMBINING BOTH - Common real-world scenario

```jsx
function LikeButton({ postId, initialLikes }) {
  // Props: postId (never changes), initialLikes (starting value)
  // State: likes (changes when user clicks)
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  
  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };
  
  return (
    <button onClick={handleLike}>
      {isLiked ? '❤️' : '🤍'} {likes}
    </button>
  );
}

// Using the LikeButton
function App() {
  return (
    <div>
      <LikeButton postId="123" initialLikes={10} />
      <LikeButton postId="456" initialLikes={25} />
    </div>
  );
}
```
