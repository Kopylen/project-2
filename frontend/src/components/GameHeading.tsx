import type { GameQuery } from "./GameGrid";

interface Props {
  gameQuery: GameQuery;
}

const GameHeading = ({ gameQuery }: Props) => {
  const heading = `${gameQuery?.platform?.name || ""} ${
    gameQuery?.genre?.name || ""
  } Games`;
  return <h1 className="text-3xl pb-2">{heading}</h1>;
};

export default GameHeading;
