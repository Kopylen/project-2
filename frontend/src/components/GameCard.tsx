import type { Game } from "../hooks/useGames";
import PlatformIconList from "./PlatformIconList";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <>
      <div className="card border rounded">
        <img
          src={game.background_image}
          className="card-img-top"
          alt="game photo"
        />
        <div className="card-body">
          <h4 className="text-center"> {game.name} </h4>
          <PlatformIconList
            platforms={game.parent_platforms.map((p) => p.platform)}
          />
        </div>
      </div>
    </>
  );
};

export default GameCard;
