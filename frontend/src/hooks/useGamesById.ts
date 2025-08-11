import type { GameById } from "../components/GamePage";
import useDataForObject from "./useDataForObject";

const useGamesById = (game: string | undefined) => {
  return useDataForObject<GameById>(`/games/${game}`);
};

export default useGamesById;
