import { useState } from "react";
import logo from "../assets/logo.webp";
import { BsSearch } from "react-icons/bs";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GenreList from "./GenreList";
import type { Genre } from "../hooks/useGenres";
import PlatformSelector from "./PlatformSelector";
import type { Platforms } from "../hooks/usePlatforms";
import SortSelector from "./SortSelector";
import SearchInput from "./SearchInput";

export interface GameQuery {
  genre: Genre | null;
  platform: Platforms | null;
  sortOrder: string;
  searchText: string;
}

const GameGrid = () => {
  const [darkMode, setDarkMode] = useState(true);

  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
  const [oredering, setOredering] = useState("Relevance");

  const { data, error, isLoading } = useGames(gameQuery);

  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div
      data-bs-theme={darkMode ? "dark" : "light"}
      className={
        darkMode
          ? "bg-dark text-white min-vh-100"
          : "bg-light text-dark min-vh-100"
      }
    >
      {error && <p> {error} </p>}
      {/* NavBar */}
      <nav
        className="navbar bg-body-tertiary"
        data-bs-theme={darkMode ? "dark" : "light"}
      >
        <div className="container-fluid justify-content-between">
          <div>
            <a className="navbar-brand">
              <img src={logo} className="d-inline-block" height="60px" />
              Rawg.io
            </a>
          </div>
          {/* Searching bar */}
          <SearchInput
            onSearch={(searchText) =>
              setGameQuery({ ...gameQuery, searchText })
            }
          />

          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="switchCheckDefault"
              onClick={() => setDarkMode(!darkMode)}
            />
            <label
              className={`form-check-label text-${
                darkMode ? "white" : "black"
              }`}
            >
              {darkMode ? "Dark Mode" : "Light Mode"}
            </label>
          </div>
        </div>
      </nav>

      {/** Main Content and Aside **/}

      <div className="mt-4" data-bs-theme={darkMode ? "dark" : "light"}>
        <div className="row">
          <aside className="col-md-2">
            <div
              className={`p-3 ${
                darkMode ? "bg-dark text-white" : "bg-light text-dark"
              }`}
            >
              <GenreList
                onSelectGenre={(genre) => {
                  setGameQuery({ ...gameQuery, genre });
                }}
                Genre={gameQuery.genre}
              />
            </div>
          </aside>

          <main className="col-md-9">
            <div className="py-3">
              <PlatformSelector
                onSelectedPlatform={(platform) =>
                  setGameQuery({ ...gameQuery, platform })
                }
                Platform={gameQuery.platform}
              />
              <SortSelector
                onSelectOrder={(sortOrder) => {
                  setGameQuery({ ...gameQuery, sortOrder: sortOrder.value });
                  setOredering(sortOrder.label);
                }}
                selectedOrder={oredering}
              />
            </div>

            <div className="row row-cols-1 row-cols-md-3 g-3">
              {/* Main content here */}
              {isLoading &&
                skeleton.map((p) => (
                  <div className="col" key={p}>
                    {" "}
                    <GameCardSkeleton />{" "}
                  </div>
                ))}
              {data &&
                data.map((game) => (
                  <div className="col" key={game.id}>
                    <GameCard game={game} />
                  </div>
                ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default GameGrid;
