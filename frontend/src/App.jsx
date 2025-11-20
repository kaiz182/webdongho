import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Cart from "./pages/cart";
import ReviewPage from "./pages/review";
import ProfilePage from "./pages/profiles";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow px-4 py-6 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            {/* Route xem tất cả review */}
            <Route path="/reviews" element={<ReviewPage />} />
            {/* Route xem review theo sản phẩm */}
            <Route path="/review/:productId" element={<ReviewPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
