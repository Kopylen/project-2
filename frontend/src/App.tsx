import { createContext, useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import type { Genre } from "./hooks/useGenres";
import type { Platforms } from "./hooks/usePlatforms";
import { Outlet } from "react-router-dom";
import Aside from "./components/Aside";

export interface GameQuery {
  genre: Genre | null;
  platform: Platforms | null;
  sortOrder: string;
  searchText: string;
}

export const modeContext = createContext<any>(null);

export const GameQueryContext = createContext<any>(null);

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

  useEffect(() => {}, [darkMode]);

  return (
    <div
      data-bs-theme={darkMode ? "dark" : "light"}
      className={
        darkMode
          ? "bg-black text-white min-vh-100"
          : "bg-light text-dark min-vh-100"
      }
    >
      <modeContext.Provider value={[darkMode, setDarkMode]}>
        <GameQueryContext.Provider value={[gameQuery, setGameQuery]}>
          <NavBar />
          <div className="mt-4" data-bs-theme={darkMode ? "" : "light"}>
            <div className="row">
              <Aside />
              <Outlet />
            </div>
          </div>
        </GameQueryContext.Provider>
      </modeContext.Provider>
    </div>
  );
}

export default App;
