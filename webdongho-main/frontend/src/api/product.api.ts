import axios from "axios";

export const getProductById = (id: string) => {
  return axios.get(`http://localhost:5000/api/products/${id}`);
};
