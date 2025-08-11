import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import formatDates from "./formatData";
import PlatformIconList from "./PlatformIconList";
import CriticScore from "./CriticScore";

interface Platform {
  id: number;
  slug: string;
  name: string;
}

interface Genre {
  id: number;
  name: string;
}

interface Objects {
  id: number;
  name: string;
  slug: string;
}

interface Requirement {
  minimum: string;
  recommended: string;
}

export interface GameById {
  id: number;
  slug: string;
  name: string;
  description_raw: string;
  metacritic: number;
  released: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  playtime: number;
  platforms: { platform: Platform; requirements: Requirement }[];
  genres: Genre[];
  developers: Objects[];
  publishers: Objects[];
  tags: Objects[];
  website: string;
}

const GamePage = () => {
  const slug = useParams<{ gameSlug: string }>();
  const [data, setData] = useState<GameById>();

  useEffect(() => {
    apiClient.get(`/games/${slug.gameSlug}`).then((res) => setData(res.data));
  }, []);

  const released = formatDates(data?.released);
  const stripHtml = (html: string) => html.replace(/<[^>]+>/g, "");
  const plainDescription = data ? stripHtml(data.description_raw) : "";
  const shortDescription = plainDescription.slice(0, 540) + "...";
  const [expanded, setExpanded] = useState(false);

  let color;
  if (data?.metacritic) {
    color = data.metacritic > 75 ? "success" : "warning";
  }
  console.log(data, data?.publishers);

  return (
    <>
      <style>
        {`
          .hover-gray:hover {
            color: gray;
            transition: color 0.3s ease;
            
          }
          .hover-white:hover {
            color: white;
            transition: color 0.3s ease;
            
          }
          .text-pointer {
            cursor: pointer;
          }
        `}
      </style>
      <main className="col-md-9 px-5">
        <div className="row">
          {/* Game Info */}

          <div className="col-md-7 pt-4">
            <p
              className="small fw-light text-secondary text-uppercase pb-1"
              style={{ letterSpacing: "2px", fontSize: "0.7rem" }}
            >
              <Link
                to="/"
                className="text-decoration-none text-reset text-pointer"
              >
                <span className="hover-white">Games/</span>
              </Link>
              {data?.name}
            </p>
            <span
              className="small border boder-black bg-white text-black rounded px-2 py-1 fw-light"
              style={{ letterSpacing: "1px", fontSize: "0.8rem" }}
            >
              {released}
            </span>
            {data?.parent_platforms && (
              <PlatformIconList
                platforms={data.parent_platforms.map((p) => p.platform)}
              />
            )}
            <span
              className="text-uppercase"
              style={{ letterSpacing: "1px", fontSize: "0.8rem" }}
            >
              Average Playtime: {data?.playtime} hours
            </span>
            <h1 className="py-3 display-2 fw-bold">{data?.name}</h1>
            <h4> About </h4>
            <p>
              {expanded ? plainDescription : shortDescription}{" "}
              {!expanded ? (
                <span
                  className="border bg-white rounded text-black px-2"
                  style={{ fontSize: "0.8rem", cursor: "pointer" }}
                  onClick={() => setExpanded(true)}
                >
                  Read more
                </span>
              ) : (
                <span
                  className="border bg-white rounded text-black px-2"
                  style={{ fontSize: "0.8rem", cursor: "pointer" }}
                  onClick={() => setExpanded(false)}
                >
                  Show less
                </span>
              )}
            </p>
            <div className="col-md-8">
              <table className="table table-borderless mt-4 bg-transparent">
                <thead>
                  <td className="text-secondary bg-transparent p-0 m-0 border-0">
                    Platforms
                  </td>
                  <td className="text-secondary bg-transparent p-0 m-0 border-0">
                    Metascore
                  </td>
                </thead>
                <tbody>
                  <tr className="">
                    <td className="col-md-8 bg-transparent p-0 m-0 border-0 pt-2">
                      {data?.platforms.map((platfrom, index) => (
                        <span
                          key={platfrom.platform.id}
                          className={`text-decoration-underline hover-gray text-pointer`}
                        >
                          {platfrom.platform.name}
                          {index !== data.platforms.length - 1 && ", "}
                        </span>
                      ))}
                    </td>
                    <td className="bg-transparent p-0 m-0 border-0 pt-2">
                      {data?.metacritic && (
                        <span
                          className={`border rounded px-2 py-1 border-${color} text-${color}`}
                        >
                          <CriticScore score={data.metacritic} />
                        </span>
                      )}
                    </td>
                  </tr>
                </tbody>
                <thead className="">
                  <td className="text-secondary bg-transparent p-0 m-0 border-0 pt-2">
                    Genre
                  </td>
                  <td className="text-secondary bg-transparent p-0 m-0 border-0 pt-2">
                    Released data
                  </td>
                </thead>
                <tbody>
                  <tr>
                    <td className="bg-transparent p-0 m-0 border-0 pt-2">
                      <span className="text-decoration-underline hover-gray text-pointer">
                        {data?.genres &&
                          data.genres.map((genre) => (
                            <span key={genre.id}> {genre.name} </span>
                          ))}
                      </span>
                    </td>
                    <td className="bg-transparent p-0 m-0 border-0 pt-2">
                      <span> {released} </span>
                    </td>
                  </tr>
                </tbody>
                <thead>
                  <td className="text-secondary bg-transparent p-0 m-0 border-0 pt-2">
                    Developer
                  </td>
                  <td className="text-secondary bg-transparent p-0 m-0 border-0 pt-2">
                    Publisher
                  </td>
                </thead>
                <tbody>
                  <tr>
                    <td className="bg-transparent p-0 m-0 border-0 pt-2">
                      {data?.developers.map((Developer) => (
                        <li className="text-decoration-underline list-unstyled hover-gray text-pointer">
                          {" "}
                          {Developer.name}{" "}
                        </li>
                      ))}
                    </td>
                    <td className="bg-transparent p-0 m-0 border-0 pt-2">
                      {data?.publishers.map((publisher) => (
                        <span className="text-decoration-underline hover-gray text-pointer">
                          {" "}
                          {publisher.name}{" "}
                        </span>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-secondary"> Tags </p>
            {data?.tags &&
              data.tags.map((tag, index) => (
                <span
                  className="hover-gray text-decoration-underline text-pointer"
                  key={tag.id}
                >
                  {tag.name}
                  {index !== data.tags.length - 1 && ", "}
                </span>
              ))}

            <p className="text-secondary pt-3"> Website </p>
            <a
              href={data?.website}
              className="text-decorated-underline text-pointer hover-gray text-reset"
            >
              {" "}
              {data?.website}{" "}
            </a>
            {data?.platforms.map((platform) => (
              <>
                {platform.requirements.minimum && (
                  <>
                    <h4 className="pt-3">
                      {" "}
                      System requirements for {platform.platform.name}{" "}
                    </h4>
                    <span className="small">
                      Minimum: {platform.requirements.minimum}{" "}
                    </span>
                    <br />
                    <span className="small">
                      Recommended: {platform.requirements.recommended}{" "}
                    </span>
                  </>
                )}
              </>
            ))}
          </div>
          {/* Game Photos */}

          <div className="col-md-2 px-2 py-4"></div>
        </div>
      </main>
    </>
  );
};

export default GamePage;
