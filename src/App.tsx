import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return <div className="p-6 text-xl text bg-red-400">Shopping list</div>;
}

export default App;
