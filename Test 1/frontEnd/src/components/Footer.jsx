import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#ab825b] text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">About Crystal Beauty</h2>
          <p className="text-sm leading-relaxed">
            Crystal Beauty offers premium beauty products from top brands to
            bring out the best in you. Our mission is to make beauty accessible
            to everyone.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-[#ffe0b5] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/product"
                className="hover:text-[#ffe0b5] transition-colors"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-[#ffe0b5] transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-[#ffe0b5] transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media and Contact */}
        <div>
          <h2 className="text-xl font-bold mb-4">Follow Us</h2>
          <div className="flex space-x-4 mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ffe0b5] transition-colors"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ffe0b5] transition-colors"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ffe0b5] transition-colors"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ffe0b5] transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <p className="text-sm">Email: support@crystalbeauty.com</p>
          <p className="text-sm">Phone: +94 123 456 789</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center mt-10 border-t border-white/50 pt-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Crystal Beauty. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
