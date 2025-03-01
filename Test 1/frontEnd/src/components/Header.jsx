import { Link } from "react-router-dom";
import {
  FaHome,
  FaShoppingBag,
  FaInfoCircle,
  FaBars,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white w-full h-[120px] shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <img
            src="/logo.png"
            alt="Logo"
            className="cursor-pointer w-[120px] h-[120px] rounded-full transform transition-transform duration-300 hover:scale-110"
          />
          <Link
            to="/"
            className="text-[#ab825b] text-3xl font-semibold transition-transform duration-300 hover:text-[#6a4d3d]"
          >
            CRYSTAL BEAUTY
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-10">
          {[{ path: "/", label: "Home", Icon: FaHome },
            { path: "/product", label: "Products", Icon: FaShoppingBag },
            { path: "/trending", label: "Trending" },
            { path: "/about", label: "About Us", Icon: FaInfoCircle },
          ].map(({ path, label, Icon }) => (
            <Link
              key={label}
              to={path}
              className="flex items-center text-[#ab825b] font-bold text-lg transition-all duration-300 hover:text-[#6a4d3d] hover:border-b-2 hover:border-[#ab825b]"
            >
              {Icon && <Icon className="mr-2 text-xl" />} {label}
            </Link>
          ))}
        </nav>

        {/* Cart and Login */}
        <div className="flex items-center space-x-6">
          <Link to="/cart" className="text-[#ab825b] text-2xl relative hover:text-[#6a4d3d]">
            <FaShoppingCart />
          </Link>
          <Link
            to="/login"
            className="bg-[#ab825b] text-white py-2 px-6 rounded-lg text-lg transition-transform duration-300 hover:bg-[#6a4d3d]"
          >
            Login
          </Link>
          <button
            className="lg:hidden text-[#ab825b] text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMenuOpen(false)}></div>
      )}

      <div
        className={`lg:hidden fixed top-0 right-0 w-3/4 h-full bg-white shadow-xl z-50 p-6 transform transition-transform duration-500 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {[{ path: "/", label: "Home", Icon: FaHome },
          { path: "/product", label: "Products", Icon: FaShoppingBag },
          { path: "/trending", label: "Trending" },
          { path: "/about", label: "About Us", Icon: FaInfoCircle },
        ].map(({ path, label, Icon }) => (
          <Link
            key={label}
            to={path}
            className="flex items-center text-[#ab825b] font-bold text-xl py-3 hover:text-[#6a4d3d]"
            onClick={() => setMenuOpen(false)}
          >
            {Icon && <Icon className="mr-2 text-xl" />} {label}
          </Link>
        ))}
      </div>
    </header>
  );
}
