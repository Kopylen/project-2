import type { GameQuery } from "./GameGrid";

interface Props {
  gameQuery: GameQuery;
}

const GameHeading = ({ gameQuery }: Props) => {
  const heading = `${gameQuery?.platform?.name || ""} ${
    gameQuery?.genre?.name || ""
  } Games`;
  return <h1 className="display-5 pb-2">{heading}</h1>;
};

export default GameHeading;
