// src/pages/Cart.tsx
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  CartItem,
  getCartItems,
  updateCartItem,
  removeCartItem,
} from "../api/cart.api";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must login first!");
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        const items = await getCartItems();

        // Convert price & quantity to numbers, fallback if invalid
        const formattedItems = items.map((item) => ({
          ...item,
          price: Number(item.price) || 0,
          quantity: Number(item.quantity) || 1,
        }));

        setCartItems(formattedItems);
      } catch (err: any) {
        toast.error(err.message || "Failed to fetch cart items!");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  // Update quantity
  const handleUpdateQuantity = async (id: string, quantity: number) => {
    if (quantity < 1) return;
    try {
      setUpdatingId(id);
      await updateCartItem(id, quantity);
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: Number(quantity) } : item
        )
      );
      toast.success("Quantity updated!");
    } catch (err: any) {
      toast.error(err.message || "Failed to update quantity!");
    } finally {
      setUpdatingId(null);
    }
  };

  // Remove item
  const handleRemove = async (id: string) => {
    try {
      await removeCartItem(id);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      toast.success("Item removed from cart!");
    } catch (err: any) {
      toast.error(err.message || "Failed to remove item!");
    }
  };

  // Total price
  const total = cartItems.reduce(
    (sum, item) =>
      sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <Toaster />
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          🛒 Your Shopping Cart
        </h1>

        {loading ? (
          <p className="text-center text-gray-600 text-lg animate-pulse">
            Loading cart...
          </p>
        ) : cartItems.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            Your cart is empty.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-transform hover:scale-105"
              >
                <div className="relative h-48">
                  <img
                    src={item.image_url || "/images/default-watch.jpg"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) =>
                      ((e.target as HTMLImageElement).src =
                        "/images/default-watch.jpg")
                    }
                  />
                  <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {item.quantity}
                  </span>
                </div>

                <div className="p-4 flex flex-col justify-between h-40">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.name}
                    </h2>
                    <p className="text-gray-700 font-medium">
                      ${item.price.toFixed(2)} x {item.quantity} = $
                      {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1 || updatingId === item.id}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 transition"
                      >
                        -
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity + 1)
                        }
                        disabled={updatingId === item.id}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-600 hover:text-red-500 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mt-10 bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-2xl font-bold text-gray-900">
              Total: ${total.toFixed(2)}
            </p>
            <button className="mt-4 md:mt-0 bg-yellow-600 hover:bg-yellow-500 text-white font-bold px-8 py-3 rounded-lg transition disabled:opacity-50">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
