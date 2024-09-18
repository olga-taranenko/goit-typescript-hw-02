import axios from "axios";
import { Response } from "../../types";

const API_KEY = "yV1MPpXqBFejC2bqtBUy3X0GKQWhVFxkkM293B9HYW4";
axios.defaults.baseURL = "https://api.unsplash.com/";
axios.defaults.params = {
  orientation: "landscape",
  per_page: 15,
};

export const requestAllImages = async (
  query: string,
  page: number
): Promise<Response> => {
  const { data } = await axios.get(
    `search/photos?client_id=${API_KEY}&query=${query}&page=${page}`
  );
  return data;
};
