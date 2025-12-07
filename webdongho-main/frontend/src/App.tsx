import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Cart from "./pages/cart";
import ReviewPage from "./pages/review";
import ProfilePage from "./pages/profiles";
import ProductDetail from "./pages/productdetail";
import store from "./redux/store";
import Checkout from "./pages/checkout";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />

          <main className="flex-grow px-4 py-6 max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />

              <Route path="/reviews" element={<ReviewPage />} />
              <Route path="/review/:productId" element={<ReviewPage />} />
              <Route path="/product/:id" element={<ProductDetail />} />

              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </Provider>
  );
}
