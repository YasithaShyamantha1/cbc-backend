import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaShoppingBag,
  FaInfoCircle,
  FaBars,
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
  FaUserShield,
  FaTimes,
} from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const userData = JSON.parse(userStr);
        setUser(userData);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-white via-amber-50 to-white w-full shadow-2xl sticky top-0 z-50 border-b-4 border-[#ab825b]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <img
            src="/logo.png"
            alt="Logo"
            className="cursor-pointer w-[100px] h-[100px] rounded-full transform transition-all duration-500 hover:scale-110 hover:rotate-6 shadow-lg border-4 border-[#ab825b]"
          />
          <Link
            to="/"
            className="text-[#ab825b] text-3xl font-bold tracking-wide transition-all duration-300 hover:text-[#8b6a4a] hover:scale-105"
          >
            CRYSTAL BEAUTY
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-2">
          {[
            { path: "/", label: "Home", Icon: FaHome },
            { path: "/product", label: "Products", Icon: FaShoppingBag },
            { path: "/trending", label: "Trending", Icon: null },
            { path: "/about", label: "About Us", Icon: FaInfoCircle },
          ].map(({ path, label, Icon }) => (
            <Link
              key={label}
              to={path}
              className="flex items-center gap-2 px-5 py-3 text-[#ab825b] font-semibold text-base rounded-lg transition-all duration-300 hover:bg-[#ab825b] hover:text-white hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-[#8b6a4a]"
            >
              {Icon && <Icon className="text-lg" />} 
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        {/* Cart and User Actions */}
        <div className="flex items-center space-x-3">
          {/* Cart Button */}
          <Link 
            to="/cart" 
            className="p-3 rounded-full bg-gradient-to-br from-[#ab825b] to-[#8b6a4a] text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 relative group"
          >
            <FaShoppingCart className="text-xl" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">0</span>
          </Link>
          
          {user ? (
            <div className="flex items-center space-x-3">
              {/* Admin Dashboard Button */}
              <Link
                to="/admin"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#ab825b] to-[#8b6a4a] text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-[#6a4d3d]"
              >
                <FaUserShield className="text-lg" />
                <span className="hidden xl:inline">Admin</span>
              </Link>

              {/* User Account Button */}
              <Link
                to="/account"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#ab825b] to-[#8b6a4a] text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <FaUser className="text-lg" />
                <span className="hidden xl:inline">{user.firstName}</span>
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#c9965f] to-[#ab825b] text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 hover:from-[#ab825b] hover:to-[#8b6a4a]"
              >
                <FaSignOutAlt className="text-lg" />
                <span className="hidden xl:inline">Logout</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#ab825b] to-[#8b6a4a] text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-[#6a4d3d]"
            >
              Login
            </Link>
          )}
          
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-3 rounded-lg bg-[#ab825b] text-white shadow-lg hover:bg-[#8b6a4a] transition-all duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-60 z-40 backdrop-blur-sm" 
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`lg:hidden fixed top-0 right-0 w-80 h-full bg-gradient-to-b from-white to-amber-50 shadow-2xl z-50 transform transition-transform duration-500 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-6 border-b-4 border-[#ab825b] bg-gradient-to-r from-[#ab825b] to-[#8b6a4a]">
          <h2 className="text-white text-2xl font-bold">Menu</h2>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white text-3xl hover:rotate-90 transition-transform duration-300"
          >
            <FaTimes />
          </button>
        </div>

        {/* Mobile Menu Items */}
        <div className="p-6 space-y-4">
          {[
            { path: "/", label: "Home", Icon: FaHome },
            { path: "/product", label: "Products", Icon: FaShoppingBag },
            { path: "/trending", label: "Trending", Icon: null },
            { path: "/about", label: "About Us", Icon: FaInfoCircle },
          ].map(({ path, label, Icon }) => (
            <Link
              key={label}
              to={path}
              className="flex items-center gap-3 text-[#ab825b] font-bold text-xl py-4 px-4 rounded-lg hover:bg-[#ab825b] hover:text-white transition-all duration-300 border-2 border-transparent hover:border-[#8b6a4a] hover:shadow-lg"
              onClick={() => setMenuOpen(false)}
            >
              {Icon && <Icon className="text-2xl" />} 
              <span>{label}</span>
            </Link>
          ))}

          {/* Mobile User Section */}
          {user && (
            <div className="pt-4 border-t-2 border-[#ab825b] space-y-4">
              <Link
                to="/admin"
                className="flex items-center gap-3 text-white font-bold text-lg py-4 px-4 rounded-lg bg-gradient-to-r from-[#ab825b] to-[#8b6a4a] shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setMenuOpen(false)}
              >
                <FaUserShield className="text-2xl" />
                <span>Admin Dashboard</span>
              </Link>
              
              <Link
                to="/account"
                className="flex items-center gap-3 text-white font-bold text-lg py-4 px-4 rounded-lg bg-gradient-to-r from-[#ab825b] to-[#8b6a4a] shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setMenuOpen(false)}
              >
                <FaUser className="text-2xl" />
                <span>{user.firstName}'s Account</span>
              </Link>
              
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 text-white font-bold text-lg py-4 px-4 rounded-lg bg-gradient-to-r from-[#c9965f] to-[#ab825b] shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FaSignOutAlt className="text-2xl" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
