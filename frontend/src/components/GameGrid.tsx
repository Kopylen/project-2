import { useState } from "react";
import logo from "../assets/logo.webp";
import { BsSearch } from "react-icons/bs";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";

const GameGrid = () => {
  const [Color, setColor] = useState("gray");
  const [darkMode, setDarkMode] = useState(true);

  const { games, error, isLoading } = useGames();

  return (
    <div data-bs-theme={darkMode ? "dark" : "light"}>
      {error && <p> {error} </p>}
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
          <div className="col-12 col-md-9">
            <form className="d-flex" role="search">
              <div className="input-group w-100">
                <span
                  className={`input-group-text bg-${Color} rounded-start-5 border-end-0`}
                >
                  <BsSearch />
                </span>
                <input
                  type="search"
                  className={`form-control border-start-0 rounded-end-5 bg-${Color}`}
                  placeholder="Search games..."
                  aria-label="Search"
                />
              </div>
            </form>
          </div>
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
      <div className="container">
        <div className="row row-cols-3">
          {isLoading && <p>Loading...</p>}

          {games &&
            games.map((game) => (
              <div className="col mt-3 card-group" key={game.id}>
                <GameCard game={game} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default GameGrid;
