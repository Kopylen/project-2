import React from "react";
import type { Game } from "../hooks/useGames";

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
          <h4> {game.name} </h4>
        </div>
      </div>
    </>
  );
};

export default GameCard;
