import { Link } from "react-router-dom";
import { FaHome, FaShoppingBag, FaInfoCircle, FaPhone, FaBars, FaShoppingCart, FaUser } from "react-icons/fa";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white w-full h-[120px] relative flex justify-between items-center px-4">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="/logo.png"
          alt="Logo"
          className="cursor-pointer w-[120px] h-[120px] rounded-full"
        />
      </div>

      {/* Navigation Menu */}
      <div className="hidden lg:flex items-center space-x-8 mx-auto">
        <Link to="/" className="flex items-center text-accent font-bold text-xl hover:border-b border-accent">
          <FaHome className="mr-2" /> Home
        </Link>
        <Link to="/product" className="flex items-center text-accent font-bold text-xl hover:border-b border-accent">
          <FaShoppingBag className="mr-2" /> Products
        </Link>
        <Link to="/about" className="flex items-center text-accent font-bold text-xl hover:border-b border-accent">
          <FaInfoCircle className="mr-2" /> About Us
        </Link>
        <Link to="/contact" className="flex items-center text-accent font-bold text-xl hover:border-b border-accent">
          <FaPhone className="mr-2" /> Contact Us
        </Link>
        <Link to="/cart" className="text-accent font-bold text-xl hover:border-b border-accent">
          <FaShoppingCart />
        </Link>
        <Link to="/login" className="flex items-center text-accent font-bold text-xl hover:border-b border-accent">
          <FaUser className="mr-2" /> Login
        </Link>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="lg:hidden flex items-center">
        <button
          className="text-accent text-3xl"
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
        className={`fixed top-0 right-0 h-full w-1/2 bg-white shadow-lg flex flex-col items-start p-4 space-y-4 z-50 transition-transform transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Link to="/" className="flex items-center text-accent font-bold text-lg" onClick={() => setMenuOpen(false)}>
          <FaHome className="mr-2" /> Home
        </Link>
        <Link to="/product" className="flex items-center text-accent font-bold text-lg" onClick={() => setMenuOpen(false)}>
          <FaShoppingBag className="mr-2" /> Products
        </Link>
        <Link to="/about" className="flex items-center text-accent font-bold text-lg" onClick={() => setMenuOpen(false)}>
          <FaInfoCircle className="mr-2" /> About Us
        </Link>
        <Link to="/contact" className="flex items-center text-accent font-bold text-lg" onClick={() => setMenuOpen(false)}>
          <FaPhone className="mr-2" /> Contact Us
        </Link>
        <Link to="/cart" className="flex items-center text-accent font-bold text-lg" onClick={() => setMenuOpen(false)}>
          <FaShoppingCart className="mr-2" /> Cart
        </Link>
        <Link to="/login" className="flex items-center text-accent font-bold text-lg" onClick={() => setMenuOpen(false)}>
          <FaUser className="mr-2" /> Login
        </Link>
      </div>
    </header>
  );
}
