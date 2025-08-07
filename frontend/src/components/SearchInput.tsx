import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";

interface Props {
  onSearch: (searchText: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  const [Color, setColor] = useState("gray");

  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="col-12 col-md-9">
      <form
        className="d-flex"
        onSubmit={(e) => {
          e.preventDefault();
          if (ref.current) onSearch(ref.current.value);
        }}
      >
        <div className="input-group w-100">
          <span
            className={`input-group-text bg-${Color} rounded-start-5 border-end-0`}
          >
            <BsSearch />
          </span>
          <input
            ref={ref}
            type="search"
            className={`form-control border-start-0 rounded-end-5 bg-${Color}`}
            placeholder="Search games..."
            aria-label="Search"
          />
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
