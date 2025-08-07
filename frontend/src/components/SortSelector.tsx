interface Ordering {
  value: string;
  label: string;
}

interface Props {
  onSelectOrder: (sortOrder: Ordering) => void;
  selectedOrder: string;
}

const SortSelector = ({ selectedOrder, onSelectOrder }: Props) => {
  const items = [
    { value: "", label: "Relevance" },
    { value: "-added", label: "Date added" },
    { value: "name", label: "Name" },
    { value: "-released", label: "Release date" },
    { value: "-metacritic", label: "Popularity" },
    { value: "-raiting", label: "Avarage rating" },
  ];

  return (
    <div className="btn-group mx-2">
      <button
        type="button"
        className="btn btn-secondary dropdown-toggle"
        data-bs-toggle="dropdown"
      >
        Sort by: {selectedOrder}
      </button>
      <ul
        className="dropdown-menu"
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        <li>
          {items.map((item) => (
            <a className="dropdown-item" onClick={() => onSelectOrder(item)}>
              {item.label}
            </a>
          ))}
        </li>
      </ul>
    </div>
  );
};

export default SortSelector;
