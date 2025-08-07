import type { Game } from "../hooks/useGames";
import getCroppedImageUrl from "../services/img-url";
import CriticScore from "./CriticScore";
import PlatformIconList from "./PlatformIconList";
import Norm from "../assets/meh.webp";
import Good from "../assets/thumbs-up.webp";
import Meh from "../assets/bulls-eye.webp";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  let color =
    game.metacritic > 75
      ? "bg-success border-success"
      : "bg-warning border-warning";

  let emj = { src: "", size: "", alt: "" };

  if (game.metacritic) {
    if (game.metacritic > 89)
      emj = { src: Meh, size: "35px", alt: "exceptional" };
    else if (game.metacritic > 75)
      emj = { src: Good, size: "25px", alt: "recommended" };
    else if (game.metacritic > 60)
      emj = { src: Norm, size: "25px", alt: "meh" };
  }

  return (
    <>
      <div className="card border rounded">
        <img
          src={getCroppedImageUrl(game.background_image)}
          className="card-img-top"
          alt="game photo"
        />
        <div className="card-body">
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
          <h4 className="p-1"> {game.name} </h4>
          <img src={emj.src} height={emj.size} alt={emj.alt} />
        </div>
      </div>
    </>
  );
};

export default GameCard;
