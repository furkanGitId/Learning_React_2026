# Getting Started with Create React App

## Day 1: Introduction to React Basics

### Overview

Today is about understanding what React is, why it exists, and how a React app is structured. You will learn JSX and basic components.

---

### Step by step

#### What is React

React is a JavaScript library for building user interfaces. Instead of manually updating the DOM, you describe the UI using components, and React updates it efficiently.

Key ideas:

- Component based

- Declarative UI

- Reusable pieces

---

#### Set up your environment

1. Install Node.js

2. Create a React app

`npx create-react-app my-react-app
cd my-react-app
npm start`

This starts a development server on `http://localhost:3000`.

---

#### JSX basics

JSX lets you write HTML like syntax inside JavaScript.

`function HelloWorld() {
return <h1>Hello, World!</h1>;
}

export default HelloWorld;`

JSX is not HTML. It gets compiled into JavaScript.

---

#### Components

Components are reusable UI blocks.

`import HelloWorld from './HelloWorld';

function App() {
return (

<div>
<HelloWorld />
<p>This is my first React app.</p>
</div>
);
}

export default App;`

---

### Quiz (Day 1)

1. What problem does React solve?

2. What is JSX?

3. What command creates a new React app?

4. Are components reusable?

5. True or false: React handles backend logic.

---

## What problem does React solve?

React solves the problem of **building complex, interactive user interfaces** that need to update frequently without rewriting lots of code.

**The Problem (Before React):** Imagine you have a shopping cart. Every time someone adds an item, you'd need to manually:

- Find the right HTML element
- Update the count
- Recalculate the total
- Update multiple parts of the page

**React's Solution:** React automatically updates your UI when data changes. You just change the data, and React handles the rest!

jsx

`function ShoppingCart() {
const [items, setItems] = useState(0);

// When you click, React automatically updates the display
return (

<div> <p>Items in cart: {items}</p> <button onClick={() => setItems(items + 1)}>Add Item</button>
</div>
);
}`

## What is JSX?

JSX is **JavaScript XML** - it lets you write HTML-like code inside JavaScript.

**Example:**

jsx

`// This looks like HTML, but it's actually JavaScript!
const greeting = <h1>Hello, Sara!</h1>;

// You can use JavaScript expressions inside {}
const name = "Sara";
const element = <h1>Hello, {name}!</h1>;

// You can even use JavaScript logic
const isLoggedIn = true;
const message = (

  <div>   {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in</h1>}   </div>
);`

## What command creates a new React app?

The most common command is:

bash

```
npx create-react-app my-app
```

**Complete example:**

bash

`# Create the app
npx create-react-app my-first-app

# Go into the folder

cd my-first-app

# Start the development server

npm start`

This creates a complete React project with all the files and tools you need to start building!

## Are components reusable?

**Yes! That's one of React's superpowers!**

**Example:**

jsx

`// Create a Button component once
function Button({ text, color }) {
return (
<button style={{  backgroundColor: color }}> {text} </button>
);
}

// Reuse it many times with different props
function App() {
return (

<div> <Button  text="Save"  color="green"  /> <Button  text="Delete"  color="red"  /> <Button  text="Cancel"  color="gray"  /> </div>
);
}`

You write the component once and use it everywhere you need it!

## True or false: React handles backend logic

**False!** React is a **frontend library** only.

**What React does:** Handles the user interface (what you see in the browser) **What React doesn't do:** Database operations, server logic, authentication

**Example of the separation:**

jsx

`// FRONTEND (React) - what the user sees
function UserProfile() {
const [user, setUser] = useState(null);

// React fetches data from the backend
useEffect(() => {
fetch('/api/user') // This calls the backend
.then(res => res.json())
.then(data => setUser(data));
}, []);

return <h1>Welcome, {user?.name}</h1>;
}

// BACKEND (Node.js/Express) - handles data and logic
app.get('/api/user', (req, res) => {
// Get user from database
const user = database.getUser(req.userId);
res.json(user);
});`

React shows the data, but the backend (like Node.js, Python, etc.) actually stores and manages it!

---

### Daily Task

Create a new component that displays:

- Your name

- One fun fact

Render it inside `App.js`.

---
