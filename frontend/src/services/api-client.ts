import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "32aeb8492c5d4f73973ef1dc760c073a",
  },
});
