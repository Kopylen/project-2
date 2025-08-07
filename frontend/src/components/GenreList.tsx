import useGenres, { type Genre } from "../hooks/useGenres.ts";
import Spinner from "react-bootstrap/Spinner";

interface Props {
  onSelectGenre: (genre: Genre) => void;
  Genre: Genre | null;
}

const GenreList = ({ onSelectGenre, Genre }: Props) => {
  const { data, isLoading } = useGenres();
  return (
    <>
      {/* <h1 className="text-2xl"> Genres </h1> */}
      {isLoading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      <ul className="list-unstyled">
        {data.map((genre) => (
          <li key={genre.id} className="p-1">
            {" "}
            <img
              className="boder rounded p-1"
              src={genre.image_background}
              height="38px"
              width="38"
            />
            <span
              onClick={() => onSelectGenre(genre)}
              className={`underline underline ${Genre == genre && "fw-bolder"}`}
              style={{ cursor: "pointer" }}
            >
              {genre.name}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default GenreList;
