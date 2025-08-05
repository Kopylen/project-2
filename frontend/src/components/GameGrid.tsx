import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import logo from "../assets/logo.webp";
import { BsSearch } from "react-icons/bs";

interface Game {
  id: number;
  name: string;
}

interface FetchGames {
  count: number;
  results: Game[];
}

const GameGrid = () => {
  const [games, setGames] = useState<Game[]>();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [Color, setColor] = useState("gray");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get<FetchGames>("/games")
      .then((res) => {
        setGames(res.data.results);
        setLoading(false);
      })
      .catch((err) => setError(err.message));
  }, []);

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
      <div>
        {isLoading && <p>Loading...</p>}

        <ul className="list-group">
          {games &&
            games.map((game) => (
              <li className="list-group-item" key={game.id}>
                {game.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default GameGrid;
