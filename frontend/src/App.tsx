import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import GameGrid from "./components/GameGrid";
import { type Genre } from "./hooks/useGenres";

function App() {
  return (
    <div data-bs-theme="dark">
      <GameGrid />
    </div>
  );
}

export default App;
