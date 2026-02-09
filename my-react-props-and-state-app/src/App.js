import './App.css';
import HelloWorld from './HelloWorld';
import { useEffect, useState } from 'react';

// step 1: create a functional component called App
// function App() {
//   return (
//     <div>
//       <HelloWorld name="Alice" />
//     </div>
//   );
// }

// step 2: use useState to create a state variable called message and set it to "HelloWorld"
// function App() {
//   const [message, setMessage] = useState("HelloWorld");
//   useEffect(() => {
//     setMessage("React Props and State App");
//   }, []);
//   return <HelloWorld name={message} />;
// }

// step 3: create a child component called WelcomeMessage that receives props and displays a welcome message
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
// function WelcomeMessage({ name, age }) {
//   return (
//     <div>
//       <h1>Hello, {name}!</h1>
//       <p>You are {age} years old.</p>
//     </div>
//   );
// }



export default App;
