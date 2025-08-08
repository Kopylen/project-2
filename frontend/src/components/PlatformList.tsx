import { useState } from "react";
import type { Platforms } from "../hooks/usePlatforms";
import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaAndroid,
} from "react-icons/fa";

import { SiNintendo } from "react-icons/si";

interface Props {
  onSelectedPlatform: (platform: Platforms | null) => void;
  Platform: Platforms | null;
}

const PlatformList = ({ onSelectedPlatform }: Props) => {
  const data = [
    { name: "PC", img: FaWindows, id: 4 },
    { name: "PlayStation 4", img: FaPlaystation, id: 18 },
    { name: "Xbox One", img: FaXbox, id: 1 },
    { name: "Nintendo Switch", img: SiNintendo, id: 7 },
    { name: "iOS", img: FaApple, id: 3 },
    { name: "Android", img: FaAndroid, id: 21 },
  ];

  const [selectedItem, setSelectedItem] = useState(0);

  return (
    <div className="p-1">
      <h1
        className="display-6"
        style={{ cursor: "pointer" }}
        onClick={() => onSelectedPlatform(null)}
      >
        {" "}
        Platform{" "}
      </h1>
      <ul className="list-unstyled px-1">
        {data.map((platform) => (
          <li
            key={platform.id}
            className="my-4"
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setSelectedItem(platform.id)}
            onMouseLeave={() => setSelectedItem(0)}
            onClick={() => onSelectedPlatform(platform)}
          >
            <span
              className={`border rounded p-2 bg-${
                selectedItem == platform.id ? "white" : ""
              }`}
            >
              <platform.img
                color={selectedItem == platform.id ? "black" : ""}
              />
            </span>{" "}
            <span>{platform.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlatformList;
