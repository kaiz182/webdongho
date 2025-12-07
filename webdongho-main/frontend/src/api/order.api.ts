// src/api/order.api.ts
import axios from "axios";

const BE_URL = "http://localhost:5000";

export const createOrder = async (
  items: any[],
  token: string,
  customer: { fullname: string; phone: string; address: string }
) => {
  return axios.post(
    `${BE_URL}/api/orders/checkout`, // ✔ ĐÚNG URL
    {
      items,
      ...customer,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
