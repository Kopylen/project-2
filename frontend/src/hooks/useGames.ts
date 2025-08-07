import type { GameQuery } from "../components/GameGrid";
import useData from "./useData";
import type { Genre } from "./useGenres";
import type { Platforms } from "./usePlatforms";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  genres: string;
  platforms: number;
}

const useGames = (gameQuery: GameQuery) =>
  useData<Game>("/games", {
    params: {
      genres: gameQuery.genre?.id,
      platforms: gameQuery.platform?.id,
      ordering: gameQuery?.sortOrder,
      search: gameQuery.searchText,
    },
  });

export default useGames;
