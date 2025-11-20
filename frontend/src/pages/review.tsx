import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getReviewsByProduct,
  getAllReviews,
  createReview,
  Review,
} from "../api/review.api";

const ReviewPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const userId = localStorage.getItem("user_id") || null;
  const token = localStorage.getItem("token") || null;

  // Fetch reviews: theo productId hoặc tất cả
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        let data: Review[] = [];
        if (productId) {
          data = await getReviewsByProduct(productId);
        } else {
          data = await getAllReviews();
        }
        setReviews(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [productId]);

  // Submit review
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!userId || !token) {
      setError("You must be logged in to submit a review.");
      return;
    }

    if (!comment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    if (!productId) {
      setError("Cannot submit review: productId missing.");
      return;
    }

    try {
      setSubmitting(true);
      const newReview = await createReview(
        { user_id: userId, product_id: productId, rating, comment },
        token
      );
      setReviews([newReview, ...reviews]);
      setRating(5);
      setComment("");
    } catch (err) {
      console.error(err);
      setError("Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          ⭐ {productId ? `Reviews for Product ${productId}` : "All Reviews"}
        </h1>

        {loading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 h-24 rounded-md" />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-center text-gray-600">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="bg-white p-4 rounded shadow hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">
                    {r.user_name || "Anonymous"}
                  </span>
                  <span className="text-yellow-500 font-bold">
                    {r.rating} ⭐
                  </span>
                </div>
                <p className="mt-2 text-gray-700">{r.comment}</p>
              </div>
            ))}
          </div>
        )}

        {/* Review form chỉ hiển thị khi có productId */}
        {productId && userId && !loading && (
          <form
            onSubmit={handleSubmit}
            className="mt-8 bg-white p-6 rounded shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>
            {error && <p className="text-red-600 mb-2">{error}</p>}

            <div className="mb-4">
              <label className="block mb-1 font-medium">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} ⭐
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                rows={4}
                placeholder="Write your review here..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="bg-yellow-600 hover:bg-yellow-500 text-white font-semibold px-6 py-2 rounded transition disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
