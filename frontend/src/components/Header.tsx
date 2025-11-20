import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-gray-900 tracking-wider"
        >
          WatchStore
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-yellow-600 transition-colors">
            Home
          </Link>
          <Link to="/cart" className="hover:text-yellow-600 transition-colors">
            Giỏ Hàng
          </Link>
          <Link to="/login" className="hover:text-yellow-600 transition-colors">
            Đăng Nhập
          </Link>
          <Link
            to="/reviews"
            className="hover:text-yellow-600 transition-colors"
          >
            Review
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <nav className="flex flex-col px-6 py-4 gap-3 text-gray-700 font-medium">
            <Link onClick={() => setMenuOpen(false)} to="/">
              Home
            </Link>
            <Link onClick={() => setMenuOpen(false)} to="/cart">
              Giỏ Hàng
            </Link>
            <Link onClick={() => setMenuOpen(false)} to="/login">
              Đăng Nhập
            </Link>
            <Link onClick={() => setMenuOpen(false)} to="/reviews">
              Review
            </Link>
            <Link onClick={() => setMenuOpen(false)} to="/Profiles">
              Profile
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
