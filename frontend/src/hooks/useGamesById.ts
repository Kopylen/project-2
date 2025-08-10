import useData from "./useData";
import type { Game } from "./useGames";

export interface getGame {
  id: number;
}

const useGamesById = (game: getGame) => {
  return useData<Game>(`/games/${game.id}`);
};

export default useGamesById;
