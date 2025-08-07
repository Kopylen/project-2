import useData from "./useData";

export interface Platforms {
  id: number;
  name: string;
}

const usePlatforms = () => useData<Platforms>("/platforms");

export default usePlatforms;
