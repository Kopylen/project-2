import type { GameQuery } from "../App";

interface Props {
  gameQuery: GameQuery;
}

const GameHeading = ({ gameQuery }: Props) => {
  const heading = `${gameQuery?.platform?.name || "Roma 4ert"} ${
    gameQuery?.genre?.name || ""
  } Games`;
  return <h1 className="display-2 pb-2 fw-bold">{heading}</h1>;
};

export default GameHeading;
