import { useContext, useState } from "react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import SortSelector from "./SortSelector";
import GameHeading from "./GameHeading";
import { Link } from "react-router-dom";
import { GameQueryContext } from "../App";

const GameGrid = () => {
  const [gameQuery, setGameQuery] = useContext(GameQueryContext);

  const { data, isLoading } = useGames(gameQuery);
  const [oredering, setOredering] = useState("Relevance");

  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <main className="col-md-10">
      <div className="">
        <GameHeading gameQuery={gameQuery} />
        <SortSelector
          onSelectOrder={(sortOrder) => {
            setGameQuery({ ...gameQuery, sortOrder: sortOrder.value });
            setOredering(sortOrder.label);
          }}
          selectedOrder={oredering}
        />
      </div>

      <div className="row row-cols-1 row-cols-md-4 g-4 px-2 pt-4">
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
            <Link
              to={`/game/${game.slug}`}
              className="text-white text-decoration-none"
            >
              <div className="col" key={game.id}>
                <GameCard game={game} />
              </div>
            </Link>
          ))}
      </div>
    </main>
  );
};

export default GameGrid;
