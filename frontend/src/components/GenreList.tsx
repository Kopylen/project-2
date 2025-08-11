import useGenres, { type Genre } from "../hooks/useGenres.ts";
import Spinner from "react-bootstrap/Spinner";

interface Props {
  onSelectGenre: (genre: Genre | null) => void;
  Genre: Genre | null;
}

const GenreList = ({ onSelectGenre, Genre }: Props) => {
  const { data, isLoading } = useGenres();
  return (
    <div className="px-4">
      <h3 onClick={() => onSelectGenre(null)} style={{ cursor: "pointer" }}>
        Genres
      </h3>
      {isLoading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      <ul className="list-unstyled">
        {data.map((genre) => (
          <li key={genre.id} className="m-2">
            {" "}
            <img
              className="boder rounded"
              src={genre.image_background}
              height="36px"
              width="35px"
            />
            <span
              onClick={() => onSelectGenre(genre)}
              className={`underline underline mx-1 ${
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
