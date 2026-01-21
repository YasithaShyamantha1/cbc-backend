import { Link, Routes, Route } from 'react-router-dom';
import { FaTachometerAlt, FaBox, FaShoppingCart, FaUsers } from 'react-icons/fa';
import AdminProductPage from './Admin/adminProductPage';
import AddProductForm from './Admin/AddProductsPage';
import EditProductForm from './Admin/EditProductPage';
import AdminOrdersPage from './Admin/AdminOrders';
import AdminDashboard from './Admin/AdminDashboard';

export default function AdminHomePage() {
  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-[#ffe0b5] via-[#fff7ed] to-[#fbeee6]">
      {/* Sidebar */}
      <div className="w-64 min-h-screen bg-white/90 shadow-2xl rounded-tr-3xl rounded-br-3xl flex flex-col items-center p-6 m-4 mt-8 mb-8">
        <h1 className="text-[#b8895a] text-3xl font-extrabold mb-10 tracking-tight drop-shadow-lg">Admin Panel</h1>
        <Link
          to="/admin/dashboard"
          className="flex items-center text-[#b8895a] text-lg gap-3 hover:bg-[#ffe0b5] hover:text-[#8b6a4a] px-5 py-3 rounded-full w-full mb-2 transition-all duration-200 font-semibold shadow-sm"
        >
          <FaTachometerAlt className="text-xl" /> Dashboard
        </Link>
        <Link
          to="/admin/products"
          className="flex items-center text-[#b8895a] text-lg gap-3 hover:bg-[#ffe0b5] hover:text-[#8b6a4a] px-5 py-3 rounded-full w-full mb-2 transition-all duration-200 font-semibold shadow-sm"
        >
          <FaBox className="text-xl" /> Products
        </Link>
        <Link
          to="/admin/orders"
          className="flex items-center text-[#b8895a] text-lg gap-3 hover:bg-[#ffe0b5] hover:text-[#8b6a4a] px-5 py-3 rounded-full w-full mb-2 transition-all duration-200 font-semibold shadow-sm"
        >
          <FaShoppingCart className="text-xl" /> Orders
        </Link>
        <Link
          to="/admin/customers"
          className="flex items-center text-[#b8895a] text-lg gap-3 hover:bg-[#ffe0b5] hover:text-[#8b6a4a] px-5 py-3 rounded-full w-full mb-2 transition-all duration-200 font-semibold shadow-sm"
        >
          <FaUsers className="text-xl" /> Customers
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-screen p-8 flex flex-col">
        <Routes>
          <Route path="/" element={<h1 className="text-4xl font-extrabold text-center text-[#b8895a] mb-10 tracking-tight drop-shadow-lg">Welcome to the Admin Dashboard</h1>} />
          <Route path="/products" element={<AdminProductPage />} />
          <Route path="/products/addProducts" element={<AddProductForm />} />
          <Route path="/products/editProducts" element={<EditProductForm />} />
          <Route path="/orders" element={<AdminOrdersPage />} />
          <Route path="/customers" element={<h1 className='text-2xl text-[#b8895a] font-bold text-center'>Customers</h1>} />
          <Route path="/dashboard" element={<AdminDashboard/>} />
        </Routes>
      </div>
    </div>
  );
}
