import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { loginUser } from "../redux/authSlice";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error } = useAppSelector((state) => state.auth);

  const [show, setShow] = useState(false); // 👁 toggle password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gray-50">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 text-center">
          Login
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 
              focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Password */}
          <div className="max-w-sm">
            <label className="block mb-1 font-medium text-gray-700">
              Password
            </label>

            <div className="relative">
              <input
                type={show ? "text" : "password"}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 
                focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />

              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-blue-500"
              >
                {show ? (
                  // icon hiện password
                  <svg
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  // icon ẩn password
                  <svg
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" y1="2" x2="22" y2="22" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-semibold py-2 rounded transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-yellow-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
