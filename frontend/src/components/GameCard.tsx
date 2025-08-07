import type { Game } from "../hooks/useGames";
import getCroppedImageUrl from "../services/img-url";
import CriticScore from "./CriticScore";
import PlatformIconList from "./PlatformIconList";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  let color =
    game.metacritic > 75
      ? "bg-success border-success"
      : "bg-warning border-warning";
  return (
    <>
      <div className="card border rounded">
        <img
          src={getCroppedImageUrl(game.background_image)}
          className="card-img-top"
          alt="game photo"
        />
        <div className="card-body">
          <h4 className="text-center"> {game.name} </h4>
          <div className="d-flex justify-content-between">
            <div>
              {game.parent_platforms && (
                <PlatformIconList
                  platforms={game.parent_platforms.map((p) => p.platform)}
                />
              )}
            </div>
            {game.metacritic && (
              <div className={`border rounded px-2 py-1 ${color}`}>
                <CriticScore score={game.metacritic} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GameCard;
