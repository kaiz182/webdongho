import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { logout } from "../redux/authSlice";
import { RootState } from "../redux/store";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // redirect sau khi logout
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-3xl font-extrabold text-gray-900 tracking-wider"
        >
          WatchStore
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <Link to="/">Home</Link>
          <Link to="/cart">Giỏ Hàng</Link>

          {user ? (
            <>
              <Link to="/profile">{user.name}</Link>
              <button
                onClick={handleLogout}
                className="text-red-600 font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">Đăng Nhập</Link>
          )}

          {/* Search */}
          <form onSubmit={handleSearch} className="ml-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search watches..."
              className="px-4 py-2 border rounded-full focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </form>
        </nav>

        {/* Mobile button */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor">
            {menuOpen ? (
              <path strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <nav className="flex flex-col px-6 py-4 gap-3">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)}>
              Giỏ Hàng
            </Link>
            <Link to="/reviews" onClick={() => setMenuOpen(false)}>
              Review
            </Link>

            {user ? (
              <>
                <Link to="/profile" onClick={() => setMenuOpen(false)}>
                  {user.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 font-bold"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Đăng Nhập
              </Link>
            )}

            {/* Mobile search */}
            <form onSubmit={handleSearch} className="mt-3">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search watches..."
                className="w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
            </form>
          </nav>
        </div>
      )}
    </header>
  );
}
