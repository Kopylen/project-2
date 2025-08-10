import { useParams } from "react-router-dom";
import useGamesById from "../hooks/useGamesById";
import { useEffect, useState } from "react";
import type { Game } from "../hooks/useGames";
import apiClient from "../services/api-client";
import formatDates from "./formatData";

export interface GameById {
  id: number;
  slug: string;
  name: string;
  description: string;
  metacritic: number;
  released: string;
  background_image: string;
}

const GamePage = () => {
  const id = useParams<{ id: string }>();
  const gameId = Number(id);
  const [data, setData] = useState<GameById>();

  useEffect(() => {
    apiClient.get(`/games/3498`).then((res) => setData(res.data));
  }, []);

  const released = formatDates(data?.released);

  return (
    <main className="col-md-9">
      <div className="">
        <h1 className="p-20">{data?.name}</h1>
        <p> {released} </p>
      </div>
    </main>
  );
};

export default GamePage;
