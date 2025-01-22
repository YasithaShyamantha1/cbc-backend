import { Link,Routes, Route } from 'react-router-dom';
import { FaTachometerAlt, FaBox, FaShoppingCart, FaUsers } from 'react-icons/fa';
import AdminProductPage from './Admin/adminProductPage';
import AddProductForm from './Admin/AddProductsPage';
import EditProductForm from './Admin/EditProductPage';



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
      
        
      <Routes>
          <Route path="/" element={<h1 className="text-3xl flex justify-center font-bold text-blue-600 fle">Welcome to the Admin Dashboard</h1>} />
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          <Route path="/products" element={<AdminProductPage/>} />
          <Route path="/products/addProducts" element={<AddProductForm/>} />
          <Route path="/products/editProducts" element={<EditProductForm />} />
          <Route path="/orders" element={<h1>orders</h1>} />
          <Route path="/customers" element={<h1>customers</h1>} />
        </Routes>
       
       
  
      </div>
      
    </div>
    
  );
}
