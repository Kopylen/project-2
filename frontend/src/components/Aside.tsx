import PlatformList from "./PlatformList";
import GenreList from "./GenreList";
import { useContext } from "react";
import { GameQueryContext } from "../App";
import { Link } from "react-router-dom";

const Aside = () => {
  const [gameQuery, setGameQuery] = useContext(GameQueryContext);

  return (
    <aside className="col-md-2">
      <div>
        <Link to="/" className="text-decoration-none text-reset">
          <h3 className="px-4 pt-4">Home</h3>
        </Link>
        <PlatformList
          onSelectedPlatform={(platform) =>
            setGameQuery({ ...gameQuery, platform })
          }
          Platform={gameQuery.platform}
        />
        <GenreList
          onSelectGenre={(genre) => {
            setGameQuery({ ...gameQuery, genre });
          }}
          Genre={gameQuery.genre}
        />
      </div>
    </aside>
  );
};

export default Aside;
