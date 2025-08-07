import usePlatforms, { type Platforms } from "../hooks/usePlatforms";

interface Props {
  onSelectedPlatform: (platform: Platforms) => void;
  Platform: Platforms | null;
}

const PlatformSelector = ({ onSelectedPlatform, Platform }: Props) => {
  const { data } = usePlatforms();

  return (
    <div className="btn-group mb-2">
      <button
        type="button"
        className="btn btn-secondary dropdown-toggle"
        data-bs-toggle="dropdown"
      >
        {Platform ? Platform.name : "Any"}
      </button>
      <ul
        className="dropdown-menu"
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        <li>
          <a className="dropdown-item" onClick={() => onSelectedPlatform(null)}>
            {" "}
            Any{" "}
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        {data.map((platform) => (
          <li key={platform.id}>
            <a
              className="dropdown-item"
              onClick={() => onSelectedPlatform(platform)}
            >
              {" "}
              {platform.name}{" "}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlatformSelector;
