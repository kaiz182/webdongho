import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewsByProduct, createReview, Review } from "../api/review.api";

const ReviewPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id"); // Giả sử bạn lưu user_id sau khi đăng nhập

  const fetchReviews = async () => {
    if (!productId) return;
    try {
      setLoading(true);
      const data = await getReviewsByProduct(productId);
      setReviews(data);
    } catch (err) {
      console.error(err);
      setError("Không thể tải đánh giá. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !userId) return alert("Bạn cần đăng nhập để đánh giá");
    if (!productId) return;
    if (comment.trim() === "") return alert("Vui lòng nhập bình luận");

    try {
      const newReview = await createReview(
        { product_id: productId, user_id: userId, rating, comment },
        token
      );
      setReviews([newReview, ...reviews]);
      setComment("");
      setRating(5);
      alert("Đã gửi review thành công!");
    } catch (err) {
      console.error(err);
      alert("Gửi review thất bại");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Đánh giá sản phẩm</h2>

      {/* Form thêm review */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <div>
          <label className="block mb-1 font-medium">Điểm (1-5)</label>
          <input
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Bình luận</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Đang gửi..." : "Gửi đánh giá"}
        </button>
      </form>

      {/* Danh sách review */}
      <div className="space-y-4">
        {loading ? (
          <p>Đang tải đánh giá...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : reviews.length === 0 ? (
          <p>Chưa có đánh giá nào</p>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="border p-3 rounded shadow-sm bg-gray-50">
              <p>
                <strong>Điểm:</strong> {r.rating}/5
              </p>
              <p>
                <strong>Bình luận:</strong> {r.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
