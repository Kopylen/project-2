import { useContext, useEffect, useState } from "react";
import type { Platforms } from "../hooks/usePlatforms";
import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaAndroid,
} from "react-icons/fa";

import { SiNintendo } from "react-icons/si";
import { modeContext } from "../App";

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
  const [darkMode] = useContext(modeContext);
  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");

  useEffect(() => {
    setColor1(darkMode ? "white" : "dark");
    setColor2(darkMode ? "dark" : "white");
  }, [darkMode]);
  //console.log(color1, color2);
  return (
    <div className="px-4 py-3">
      <h3
        style={{ cursor: "pointer" }}
        onClick={() => onSelectedPlatform(null)}
      >
        Platform
      </h3>
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
              className={`rounded border p-2 bg-${
                selectedItem == platform.id ? color1 : color2
              }`}
            >
              <platform.img
                color={
                  selectedItem == platform.id
                    ? color2 == "dark"
                      ? "black"
                      : "white"
                    : color1 == "dark"
                    ? "black"
                    : "white"
                }
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
