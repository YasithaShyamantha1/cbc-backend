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
    <header className="bg-white w-full h-[120px] relative flex flex-col lg:flex-row justify-between items-center px-6 shadow-md">
      {/* Logo and Title */}
      <div className="flex items-center space-x-4">
        <img
          src="/logo.png"
          alt="Logo"
          className="cursor-pointer w-[120px] h-[120px] rounded-full transform transition-transform duration-300 hover:scale-110"
        />
        <Link
          to="/"
          className="text-[#ab825b] text-2xl font-bold transition-transform duration-300 hover:scale-105"
        >
          CRYSTAL BEAUTY
        </Link>
      </div>

      {/* Navigation Menu */}
      <div className="hidden lg:flex items-center space-x-8 mx-auto">
        <Link
          to="/"
          className="flex items-center text-[#ab825b] font-bold text-xl transition-all duration-300 hover:border-b-2 hover:border-[#ab825b] hover:text-[#ab825b]"
        >
          <FaHome className="mr-2" /> Home
        </Link>
        <Link
          to="/product"
          className="flex items-center text-[#ab825b] font-bold text-xl transition-all duration-300 hover:border-b-2 hover:border-[#ab825b] hover:text-[#ab825b]"
        >
          <FaShoppingBag className="mr-2" /> Products
        </Link>
        <div className="relative group">
          <button className="flex items-center text-[#ab825b] font-bold text-xl transition-all duration-300 hover:border-b-2 hover:border-[#ab825b] hover:text-[#ab825b]">
            Brands
          </button>
          <div className="absolute hidden group-hover:block bg-white shadow-md rounded-lg py-2">
            <Link
              to="/brand1"
              className="block px-4 py-2 text-[#ab825b] hover:bg-[#ffe0b5] hover:text-[#ab825b]"
            >
              Brand 1
            </Link>
            <Link
              to="/brand2"
              className="block px-4 py-2 text-[#ab825b] hover:bg-[#ffe0b5] hover:text-[#ab825b]"
            >
              Brand 2
            </Link>
            <Link
              to="/brand3"
              className="block px-4 py-2 text-[#ab825b] hover:bg-[#ffe0b5] hover:text-[#ab825b]"
            >
              Brand 3
            </Link>
          </div>
        </div>
        <Link
          to="/trending"
          className="flex items-center text-[#ab825b] font-bold text-xl transition-all duration-300 hover:border-b-2 hover:border-[#ab825b] hover:text-[#ab825b]"
        >
          Trending
        </Link>
        <Link
          to="/about"
          className="flex items-center text-[#ab825b] font-bold text-xl transition-all duration-300 hover:border-b-2 hover:border-[#ab825b] hover:text-[#ab825b]"
        >
          <FaInfoCircle className="mr-2" /> About Us
        </Link>
      </div>

      {/* Login and Cart */}
      <div className="flex items-center space-x-4 lg:absolute lg:top-6 lg:right-8">
        <Link
          to="/cart"
          className="relative flex items-center text-[#ab825b] font-bold text-2xl transition-all duration-300 hover:border-b-5 hover:border-[#ab825b] hover:text-[#ab825b]"
        >
          <FaShoppingCart />
        </Link>
        <Link
          to="/login"
          className="bg-[#ab825b] text-white py-2 px-4 rounded-lg transition-transform duration-300 hover:scale-105"
        >
          Login
        </Link>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="lg:hidden flex items-center">
        <button
          className="text-[#ab825b] text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars />
        </button>
      </div>

      {/* Dark Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Dropdown Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-1/2 bg-white shadow-lg flex flex-col items-start p-6 space-y-6 z-50 transform transition-transform duration-500 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Link
          to="/"
          className="flex items-center text-[#ab825b] font-bold text-lg transition-all duration-300 hover:text-[#ab825b]"
          onClick={() => setMenuOpen(false)}
        >
          <FaHome className="mr-2" /> Home
        </Link>
        <Link
          to="/product"
          className="flex items-center text-[#ab825b] font-bold text-lg transition-all duration-300 hover:text-[#ab825b]"
          onClick={() => setMenuOpen(false)}
        >
          <FaShoppingBag className="mr-2" /> Products
        </Link>
        <div className="relative group">
          <button className="flex items-center text-[#ab825b] font-bold text-lg transition-all duration-300 hover:text-[#ab825b]">
            Brands
          </button>
          <div className="absolute bg-white shadow-md rounded-lg py-2">
            <Link
              to="/brand1"
              className="block px-4 py-2 text-[#ab825b] hover:bg-[#ffe0b5] hover:text-[#ab825b]"
              onClick={() => setMenuOpen(false)}
            >
              Brand 1
            </Link>
            <Link
              to="/brand2"
              className="block px-4 py-2 text-[#ab825b] hover:bg-[#ffe0b5] hover:text-[#ab825b]"
              onClick={() => setMenuOpen(false)}
            >
              Brand 2
            </Link>
            <Link
              to="/brand3"
              className="block px-4 py-2 text-[#ab825b] hover:bg-[#ffe0b5] hover:text-[#ab825b]"
              onClick={() => setMenuOpen(false)}
            >
              Brand 3
            </Link>
          </div>
        </div>
        <Link
          to="/trending"
          className="flex items-center text-[#ab825b] font-bold text-lg transition-all duration-300 hover:text-[#ab825b]"
          onClick={() => setMenuOpen(false)}
        >
          Trending
        </Link>
        <Link
          to="/about"
          className="flex items-center text-[#ab825b] font-bold text-lg transition-all duration-300 hover:text-[#ab825b]"
          onClick={() => setMenuOpen(false)}
        >
          <FaInfoCircle className="mr-2" /> About Us
        </Link>
      </div>
    </header>
  );
}
