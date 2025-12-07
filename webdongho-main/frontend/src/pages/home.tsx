import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { addToCart as addToCartRedux, setCartItems } from "../redux/cartSlice";

interface Product {
  id: string;
  name: string;
  description?: string;
  price: string;
  image_url?: string;
  stock?: number;
}
interface CartItem {
  product_id: string;
  quantity: number;
}
interface Review {
  product_id: string;
  rating: number;
}

const BE_URL = "http://localhost:5000";

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingCart, setLoadingCart] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Search param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get("search") || "");
  }, [location.search]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BE_URL}/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load products!");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch cart
  useEffect(() => {
    if (!token) return;
    const fetchCart = async () => {
      try {
        const res = await axios.get(`${BE_URL}/api/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setCartItems(res.data));
      } catch (err) {
        console.error(err);
      }
    };
    fetchCart();
  }, [token, dispatch]);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${BE_URL}/api/reviews`);
        setReviews(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate average rating
  const getAvgRating = (productId: string) => {
    const productReviews = reviews.filter((r) => r.product_id === productId);
    if (!productReviews.length) return 0;
    const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / productReviews.length;
  };

  // Render stars
  const renderStars = (rating: number) => {
    const r = Math.round(rating);
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`text-yellow-500 ${
              i < r ? "opacity-100" : "opacity-30"
            }`}
          >
            ★
          </span>
        ))}
        <span className="text-sm text-gray-600 ml-1">{r}.0</span>
      </div>
    );
  };

  // Add to cart
  const addToCart = async (product: Product) => {
    if (!token) {
      toast.error("You must login!");
      return navigate("/login");
    }

    if ((product.stock || 0) <= 0) {
      toast.error("Product out of stock!");
      return;
    }

    try {
      setLoadingCart(product.id);
      await axios.post(
        `${BE_URL}/api/cart/add`,
        { product_id: product.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Added to cart!");
      dispatch(
        addToCartRedux({
          id: product.id,
          name: product.name,
          price: Number(product.price),
          image_url: product.image_url,
          quantity: 1,
        })
      );
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add!");
    } finally {
      setLoadingCart(null);
    }
  };

  return (
    <main className="w-full min-h-screen px-6 py-10 bg-gray-900 text-white">
      <Toaster />

      <h1 className="text-5xl font-extrabold text-center mb-10 text-yellow-400">
        Featured Watches ⌚
      </h1>

      <div className="mb-8 text-center">
        <input
          type="text"
          placeholder="Search watches..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-lg text-black w-full max-w-md"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-300 text-xl animate-pulse">
          Loading products...
        </p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-400 text-xl mt-20">
          No products found for: "{searchTerm}"
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white text-black rounded-xl shadow-md hover:shadow-2xl transition-all hover:scale-105 overflow-hidden flex flex-col"
            >
              <Link to={`/product/${p.id}`} className="relative h-56 block">
                <img
                  src={
                    p.image_url
                      ? `${BE_URL}${p.image_url}`
                      : "/images/default-watch.jpg"
                  }
                  alt={p.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/images/default-watch.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
                {p.stock !== undefined && (
                  <span
                    className={`absolute top-2 right-2 text-white text-xs px-3 py-1 rounded-full ${
                      p.stock > 0 ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {p.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                )}
              </Link>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg truncate">{p.name}</h3>
                  <p className="text-yellow-600 text-2xl font-bold mb-1">
                    ${Number(p.price).toFixed(2)}
                  </p>
                  {renderStars(getAvgRating(p.id))}
                  <p className="text-gray-600 text-sm mt-1">
                    {reviews.filter((r) => r.product_id === p.id).length}{" "}
                    reviews
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => addToCart(p)}
                    disabled={loadingCart === p.id || (p.stock || 0) <= 0}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition disabled:opacity-40"
                  >
                    {loadingCart === p.id ? "Adding..." : "🛒 Add to Cart"}
                  </button>
                  <Link
                    to={`/product/${p.id}`}
                    className="block text-blue-600 text-center text-sm mt-3 hover:underline"
                  >
                    View Details & Reviews
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Home;
