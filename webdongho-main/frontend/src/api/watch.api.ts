import axios from "axios";

const API_URL = "http://localhost:5000/api/watch";

export interface WatchItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export const getAllWatches = async (): Promise<WatchItem[]> => {
  const res = await axios.get(`${API_URL}/all`);
  return res.data;
};
export const getWatchById = async (id: string): Promise<WatchItem> => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};
export const searchWatches = async (query: string): Promise<WatchItem[]> => {
  const res = await axios.get(`${API_URL}/search`, {
    params: { q: query },
  });
  return res.data;
};
