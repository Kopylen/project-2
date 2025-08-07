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

interface Props {
  selectedGenre: Genre | null;
  selectedPlatform: Platforms | null;
}

const useGames = ({ selectedGenre, selectedPlatform }: Props) =>
  useData<Game>("/games", {
    params: { genres: selectedGenre?.id, platforms: selectedPlatform?.id },
  });

export default useGames;
