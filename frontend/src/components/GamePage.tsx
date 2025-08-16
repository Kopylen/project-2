import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import formatDates from "../services/formatData";
import PlatformIconList from "./PlatformIconList";
import CriticScore from "./CriticScore";
import useGamesById from "../hooks/useGamesById";
import Spinner from "react-bootstrap/Spinner";
import apiClient from "../services/api-client";

interface Objects {
  id: number;
  name: string;
  slug: string;
}

interface Image {
  id: number;
  image: string;
}

interface VideoData {
  max: string;
}

interface Video {
  id: number;
  preview: string;
  data: VideoData;
}

interface Requirement {
  minimum: string;
  recommended: string;
}

interface Store {
  store_id: number;
  url: string;
}

interface StoreInfo {
  id: number;
  name: string;
  image_background: string;
}

export interface GameById {
  id: number;
  slug: string;
  name: string;
  description_raw: string;
  metacritic: number;
  released: string;
  background_image: string;
  parent_platforms: { platform: Objects }[];
  playtime: number;
  platforms: { platform: Objects; requirements: Requirement }[];
  genres: Objects[];
  developers: Objects[];
  publishers: Objects[];
  tags: Objects[];
  website: string;
  updated: string;
}

const GamePage = () => {
  const slug = useParams<{ gameSlug: string }>();
  const { data, isLoading } = useGamesById(slug.gameSlug);
  const [screenshots, setScreeshots] = useState<Image[]>();
  const [trailer, setTrailer] = useState<Video[]>();
  const [stores, setStore] = useState<Store[]>([]);
  const [storeInfo, setStoreInfo] = useState<StoreInfo[]>([]);

  const released = formatDates(data?.released);
  const stripHtml = (html: string) => html.replace(/<[^>]+>/g, "");
  const plainDescription = data ? stripHtml(data.description_raw) : "";
  const shortDescription = plainDescription.slice(0, 540) + "...";
  const [expanded, setExpanded] = useState(false);

  let color;
  if (data?.metacritic) {
    color = data.metacritic > 75 ? "success" : "warning";
  }

  useEffect(() => {
    apiClient
      .get(`games/${slug.gameSlug}/screenshots`)
      .then((res) => setScreeshots(res.data.results));
    apiClient
      .get(`games/${slug.gameSlug}/movies`)
      .then((res) => setTrailer(res.data.results));
    apiClient.get(`games/${slug.gameSlug}/stores`).then((res) => {
      setStore(res.data.results);
    });
    apiClient.get("/stores").then((res) => setStoreInfo(res.data.results));
  }, []);

  const [dictStore, setDictStore] = useState<Record<number, number>>({});

  useEffect(() => {
    if (storeInfo.length > 0) {
      const dict: Record<number, number> = {};
      storeInfo.forEach((store, index) => {
        dict[store.id] = index;
      });
      setDictStore(dict);
    }
  }, [storeInfo]);

  //console.log(stores);

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
          .bg-gray {
            background: #2d2d2d;
          }
          .text-gray {
              color: #818181;
            }
        `}
      </style>
      <main className="col-md-9 px-4">
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
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
                    <tr>
                      <th className="text-secondary bg-transparent p-0 m-0 border-0">
                        Platforms
                      </th>
                      <th className="text-secondary bg-transparent p-0 m-0 border-0">
                        Metascore
                      </th>
                    </tr>
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
                    <tr>
                      <th className="text-secondary bg-transparent p-0 m-0 border-0 pt-2">
                        Genre
                      </th>
                      <th className="text-secondary bg-transparent p-0 m-0 border-0 pt-2">
                        Released data
                      </th>
                    </tr>
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
                    <tr>
                      <th className="text-secondary bg-transparent p-0 m-0 border-0 pt-2">
                        Developer
                      </th>
                      <th className="text-secondary bg-transparent p-0 m-0 border-0 pt-2">
                        Publisher
                      </th>
                    </tr>
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
                  <br />
                  <p></p>
                </>
              ))}
            </div>
            {/* Game Photos */}

            <div className="col-md-5 py-4 ">
              <img
                src={data?.background_image}
                width={397}
                style={{ objectFit: "cover" }}
                className="rounded mb-4"
              />
              <div className="row gx-1">
                <div className="col-6 p-1">
                  {trailer?.length
                    ? trailer?.map((video, index) => {
                        if (index > 0) return null;
                        return (
                          <video
                            className="rounded shadow"
                            width="186"
                            height="104"
                            muted
                            autoPlay
                            loop
                            controls
                            poster={video.preview}
                          >
                            <source src={video.data.max} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        );
                      })
                    : screenshots?.map((image, index) => {
                        if (index != 3) return null;
                        return (
                          <div className="col-6 p-1" key={image.id}>
                            <img
                              src={image.image}
                              className="rounded shadow-lg"
                              width={186}
                              height={104}
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        );
                      })}
                </div>
                {screenshots?.map((image, index) => {
                  if (index > 2) return null;
                  return (
                    <div className="col-6 p-1" key={image.id}>
                      <img
                        src={image.image}
                        className="rounded shadow-lg"
                        width={186}
                        height={104}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  );
                })}
                <p className="text-center text-secondary p-3 small">
                  {" "}
                  Last modified: {formatDates(data?.updated)}{" "}
                </p>
                <h5 className="text-gray fw-light">Where to buy</h5>
                <div className="row p-0 mt-2">
                  {stores.map((store) => {
                    const index = dictStore[store.store_id];
                    const data = storeInfo[index];
                    return (
                      <div className="col-6">
                        <a
                          href={store.url}
                          className="text-reset text-decoration-none"
                        >
                          <p className="bordered bg-gray text-center py-2 rounded text-gray">
                            {data.name}
                          </p>
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default GamePage;
