// src/pages/ProductDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addToCart as addToCartRedux } from "../redux/cartSlice";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { getProductById } from "../api/product.api";

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number | string;
  image_url?: string;
  stock?: number;
  rating?: number;
}

const BE_URL = "http://localhost:5000";

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const token = localStorage.getItem("token");

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const res = await getProductById(id);
        setProduct(res.data);
      } catch (err) {
        console.error("Fetch product error:", err);
        toast.error("Không tải được sản phẩm");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Add to cart
  const handleAddToCart = async () => {
    if (!token) {
      toast.error("Bạn cần đăng nhập!");
      return;
    }
    if (!product) return;

    try {
      setAdding(true);
      const res = await axios.post(
        `${BE_URL}/api/cart/add`,
        { product_id: product.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data.message || "Đã thêm vào giỏ!");
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
      toast.error(err.response?.data?.message || "Thêm giỏ thất bại");
    } finally {
      setAdding(false);
    }
  };

  const renderStars = (rating?: number) => {
    const r = Math.round(rating || 0);
    return (
      <div className="flex gap-1 items-center">
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

  if (loading) return <p className="text-center mt-10">Đang tải sản phẩm...</p>;
  if (!product)
    return <p className="text-center mt-10">Không tìm thấy sản phẩm</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Toaster />
      <div className="flex flex-col md:flex-row gap-10">
        {/* Image */}
        <div className="flex-shrink-0 w-full md:w-96 h-96">
          <img
            src={
              product.image_url
                ? `${BE_URL}${product.image_url}`
                : "/images/default-watch.jpg"
            }
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
            onError={(e) =>
              ((e.target as HTMLImageElement).src = "/images/default-watch.jpg")
            }
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-3">{product.name}</h2>
          {renderStars(product.rating)}
          <p className="text-2xl font-extrabold text-yellow-600 my-4">
            ${Number(product.price).toFixed(2)}
          </p>
          {product.stock !== undefined && (
            <p
              className={`mb-4 font-semibold ${
                product.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stock > 0 ? "Còn hàng" : "Hết hàng"}
            </p>
          )}
          <p className="mb-6">{product.description}</p>

          <button
            onClick={handleAddToCart}
            disabled={adding || (product.stock || 0) <= 0}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {adding ? "Đang thêm..." : "Thêm vào giỏ"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
