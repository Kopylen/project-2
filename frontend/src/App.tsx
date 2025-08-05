import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import GameGrid from "./components/GameGrid";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div data-bs-theme="dark">
      <GameGrid />
    </div>
  );
}

export default App;
