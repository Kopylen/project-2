import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Image } from "react-skeleton-image";

const GameCardSkeleton = () => {
  return (
    <>
      <div className="card border rounded">
        <div className="card-body">
          <span className="card-img-top">
            <Image width={320} height={200} />
          </span>
          <Skeleton />
          <br />
          <Skeleton count={2} />
        </div>
      </div>
    </>
  );
};

export default GameCardSkeleton;
