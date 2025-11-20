import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

interface Product {
  id: string;
  name: string;
  description?: string;
  price: string;
  image_url?: string;
  stock?: number;
  rating?: number;
}

const BE_URL = "http://localhost:5000";

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${BE_URL}/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.error("Fetch products error:", err);
        toast.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const renderStars = (rating: number | undefined) => {
    if (!rating) return <p className="text-gray-400 text-sm">No rating</p>;
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`text-yellow-500 ${
              i < rating ? "opacity-100" : "opacity-30"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const handleAddToCart = async (productId: string) => {
    if (!token) {
      toast.error("You must login first!");
      navigate("/login");
      return;
    }

    if (!productId) {
      toast.error("Invalid product");
      return;
    }

    try {
      console.log(
        "Adding to cart:",
        { product_id: productId, quantity: 1 },
        "Token:",
        token
      );
      const res = await axios.post(
        `${BE_URL}/api/cart/add`,
        { product_id: productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message || "Added to cart!");
    } catch (err: any) {
      console.error("Add to cart error:", err);
      toast.error(err.response?.data?.message || "Failed to add to cart");
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex flex-col min-h-screen px-6 py-10 bg-gradient-to-b from-gray-100 to-gray-200 animate-fadeIn">
      <Toaster position="top-right" />
      <h1 className="text-5xl font-extrabold mb-6 text-center text-gray-900 tracking-tight animate-fadeIn">
        ⌚ Featured Watches
      </h1>

      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search for a watch..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none transition"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-600 text-lg">Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-fadeIn">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-scaleUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={
                    product.image_url
                      ? `${BE_URL}${product.image_url}`
                      : "/images/default-watch.jpg"
                  }
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
                <span className="absolute bottom-2 left-2 text-white font-semibold text-lg drop-shadow">
                  {product.name}
                </span>
              </div>

              <div className="p-5">
                <p className="text-yellow-600 font-bold text-xl mb-2">
                  ${product.price}
                </p>
                <div className="mb-3">{renderStars(product.rating)}</div>

                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="w-full bg-yellow-500 text-white font-semibold py-2.5 rounded-lg hover:bg-yellow-600 transition"
                >
                  🛒 Add to Cart
                </button>

                <Link
                  to={`/review/${product.id}`}
                  className="block mt-3 text-yellow-600 font-medium hover:underline text-center"
                >
                  View Reviews
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Home;
