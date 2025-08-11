import { useContext } from "react";
import logo from "../assets/logo.webp";
import SearchInput from "./SearchInput";
import { GameQueryContext, modeContext } from "../App";

const NavBar = () => {
  const [darkMode, setDarkMode] = useContext(modeContext);
  const [gameQuery, setGameQuery] = useContext(GameQueryContext);

  return (
    <nav className="navbar p-3">
      <div className="container-fluid justify-content-between">
        <div>
          <a className="navbar-brand">
            <img src={logo} className="d-inline-block" height="60px" />
            Rawg.io
          </a>
        </div>
        {/* Searching bar */}
        <SearchInput
          onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText })}
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
            className={`form-check-label text-${darkMode ? "white" : "black"}`}
          >
            {darkMode ? "Dark Mode" : "Light Mode"}
          </label>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
