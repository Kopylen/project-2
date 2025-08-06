import useGenres from "../hooks/useGenres.ts";

const GenreList = () => {
  const { data } = useGenres();
  return (
    <>
      <h1 className="text-2xl"> Genres </h1>
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
