import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* About */}
        <div>
          <h2 className="text-2xl font-bold mb-4 tracking-wide">WatchStore</h2>
          <p className="text-gray-300 leading-relaxed">
            Cửa hàng đồng hồ chính hãng – uy tín – chất lượng hàng đầu. 
            Khám phá bộ sưu tập đồng hồ sang trọng từ các thương hiệu nổi tiếng.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact</h2>
          <p className="text-gray-300 flex items-center gap-2">📞 0900 000 000</p>
          <p className="text-gray-300 flex items-center gap-2">📍 TP. Đà Nẵng</p>
          <p className="text-gray-300 flex items-center gap-2">✉ support@watchstore.vn</p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="flex flex-col gap-3">
            <li>
              <Link to="/" className="hover:text-yellow-500 transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-yellow-500 transition-colors">Đăng nhập</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-yellow-500 transition-colors">Review</Link>
            </li>
            
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 text-center py-4 text-gray-400 text-sm">
        © 2025 WatchStore. All rights reserved.
      </div>
    </footer>
  );
}
