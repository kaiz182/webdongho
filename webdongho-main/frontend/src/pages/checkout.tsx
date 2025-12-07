// src/pages/Checkout.tsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { clearCart } from "../redux/cartSlice";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../api/order.api";

const Checkout: React.FC = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  // Kiểm tra login khi vào trang
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to checkout");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    if (!form.fullname || !form.phone || !form.address) {
      toast.error("Please fill all fields");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to checkout");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const orderItems = items.map((i) => ({
        product_id: i.id,
        quantity: i.quantity,
        price: i.price,
      }));

      await createOrder(orderItems, token);
      dispatch(clearCart());
      toast.success("Order placed successfully!");

      setTimeout(() => navigate("/"), 1000);
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <Toaster position="top-right" />
      <div className="bg-white p-8 shadow-lg rounded-xl w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

        <div className="space-y-4">
          <input
            type="text"
            name="fullname"
            placeholder="Full name"
            value={form.fullname}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Delivery address"
            value={form.address}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <p className="text-lg font-semibold mt-4">
            Total:{" "}
            {items
              .reduce((sum, i) => sum + i.price * i.quantity, 0)
              .toLocaleString("en-US", { style: "currency", currency: "USD" })}
          </p>

          <button
            onClick={handleOrder}
            disabled={items.length === 0 || loading}
            className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-3 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Confirm Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
