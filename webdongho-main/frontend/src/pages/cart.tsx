import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BE_URL = "http://localhost:5000";

interface CartItem {
  id: string;
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
}

const fetchProduct = async (product_id: string) => {
  try {
    const res = await axios.get(`${BE_URL}/api/products/${product_id}`);
    const p = res.data;
    return {
      name: p.name || "Unknown",
      price: Number(p.price) || 0,
      image_url: p.image_url
        ? `${BE_URL}${p.image_url}`
        : "/images/default-watch.jpg",
    };
  } catch {
    return {
      name: "Unknown",
      price: 0,
      image_url: "/images/default-watch.jpg",
    };
  }
};

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    if (!token) {
      toast.error("You must login first!");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(`${BE_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const items = await Promise.all(
        res.data.map(async (item: any) => {
          const p = await fetchProduct(item.product_id);

          return {
            id: item.id,
            product_id: item.product_id,
            quantity: Number(item.quantity) || 1,
            ...p,
          };
        })
      );

      setCartItems(items);
    } catch {
      toast.error("Failed to fetch cart!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  const updateQuantity = async (id: string, quantity: number) => {
    if (!token || quantity < 1) return;

    try {
      setUpdatingId(id);
      await axios.put(
        `${BE_URL}/api/cart/update/${id}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
      toast.success("Quantity updated!");
    } catch {
      toast.error("Failed to update!");
    } finally {
      setUpdatingId(null);
    }
  };

  const removeItem = async (id: string) => {
    if (!token) return;

    try {
      await axios.delete(`${BE_URL}/api/cart/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCartItems((prev) => prev.filter((item) => item.id !== id));
      toast.success("Item removed!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to remove item!");
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!token)
    return (
      <p className="text-center mt-20 text-xl text-red-500">
        You must login to see your cart.
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <Toaster />
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">🛒 Your Cart</h1>

        {loading ? (
          <p className="text-center text-gray-700 text-lg animate-pulse">
            Loading cart...
          </p>
        ) : cartItems.length === 0 ? (
          <p className="text-center text-gray-700 text-lg">Cart is empty.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="h-48 w-full object-cover"
                    onError={(e) =>
                      ((e.currentTarget as HTMLImageElement).src =
                        "/images/default-watch.jpg")
                    }
                  />

                  <div className="p-4">
                    <h2 className="font-semibold text-lg">{item.name}</h2>

                    <p className="text-gray-700">
                      ${item.price.toFixed(2)} x {item.quantity} = $
                      {(item.price * item.quantity).toFixed(2)}
                    </p>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={
                            item.quantity <= 1 || updatingId === item.id
                          }
                          className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 flex items-center justify-center"
                        >
                          -
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          disabled={updatingId === item.id}
                          className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-500 font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* TOTAL + CHECKOUT */}
            <div className="mt-10 bg-white shadow-md rounded-xl p-6 flex justify-between items-center">
              <p className="text-2xl font-bold">Total: ${total.toFixed(2)}</p>

              <button
                onClick={() => navigate("/checkout")}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-3 rounded-lg transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
