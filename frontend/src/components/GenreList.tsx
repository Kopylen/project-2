import useGenres from "../hooks/useGenres.ts";
import Spinner from "react-bootstrap/Spinner";

const GenreList = () => {
  const { data, isLoading } = useGenres();
  return (
    <>
      <h1 className="text-2xl"> Genres </h1>
      {isLoading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      <ul className="list-group">
        {data.map((genre) => (
          <li key={genre.id} className="p-1 list-group-item">
            {" "}
            <img
              className="boder rounded"
              src={genre.image_background}
              height="38px"
              width="38"
            />{" "}
            {genre.name}{" "}
          </li>
        ))}
      </ul>
    </>
  );
};

export default GenreList;
