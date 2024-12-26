import { Link,Routes, Route } from 'react-router-dom';
import { FaTachometerAlt, FaBox, FaShoppingCart, FaUsers } from 'react-icons/fa';

export default function AdminHomePage() {
  return (
    <div className="bg-blue-100 w-full h-screen flex">
      {/* Sidebar */}
      <div className="w-1/4 h-screen bg-blue-500 flex flex-col items-center p-4 space-y-6">
        <h1 className="text-white text-2xl font-bold">Admin Panel</h1>
        <Link
          to="/admin/dashboard"
          className="flex items-center text-white text-lg gap-2 hover:bg-blue-600 px-4 py-2 rounded w-full text-center"
        >
          <FaTachometerAlt /> Dashboard
        </Link>
        <Link
          to="/admin/products"
          className="flex items-center text-white text-lg gap-2 hover:bg-blue-600 px-4 py-2 rounded w-full text-center"
        >
          <FaBox /> Products
        </Link>
        <Link
          to="/admin/orders"
          className="flex items-center text-white text-lg gap-2 hover:bg-blue-600 px-4 py-2 rounded w-full text-center"
        >
          <FaShoppingCart /> Orders
        </Link>
        <Link
          to="/admin/customers"
          className="flex items-center text-white text-lg gap-2 hover:bg-blue-600 px-4 py-2 rounded w-full text-center"
        >
          <FaUsers /> Customers
        </Link>
      </div>

      {/* Main Content */}
      <div className="w-3/4 h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-blue-600">Welcome to the Admin Dashboard</h1>
       <p className="text-gray-600 mt-4">
          Select an option from the sidebar to get started managing your site.
        </p>
        {/* <BrowserRouter> 
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<AdminProductPage />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
        </Routes>
        </BrowserRouter> */}
      </div>
      
    </div>
    
  );
}
