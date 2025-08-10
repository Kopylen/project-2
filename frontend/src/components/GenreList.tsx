import useGenres, { type Genre } from "../hooks/useGenres.ts";
import Spinner from "react-bootstrap/Spinner";

interface Props {
  onSelectGenre: (genre: Genre | null) => void;
  Genre: Genre | null;
}

const GenreList = ({ onSelectGenre, Genre }: Props) => {
  const { data, isLoading } = useGenres();
  return (
    <div className="p-3">
      <h1
        className="display-6"
        onClick={() => onSelectGenre(null)}
        style={{ cursor: "pointer" }}
      >
        {" "}
        Genres{" "}
      </h1>
      {isLoading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      <ul className="list-unstyled">
        {data.map((genre) => (
          <li key={genre.id} className="">
            {" "}
            <img
              className="boder rounded p-2"
              src={genre.image_background}
              height="57px"
              width="57px"
            />
            <span
              onClick={() => onSelectGenre(genre)}
              className={`underline underline ${
                Genre == genre && "fw-bolder"
              } `}
              style={{ cursor: "pointer" }}
            >
              {genre.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenreList;
