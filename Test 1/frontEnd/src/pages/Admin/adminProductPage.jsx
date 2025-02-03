import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/products");
        setProducts(res.data);
      } catch (error) {
        toast.error("Failed to fetch products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const navigate = useNavigate();

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(import.meta.env.VITE_BACKEND_URL + `/products/${selectedProduct.productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) => prev.filter((p) => p.productId !== selectedProduct.productId));
      toast.success("Product deleted successfully!");
      setSelectedProduct(null);
    } catch (error) {
      toast.error("Failed to delete product. Please try again.");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="w-full h-full flex flex-col items-center p-6 min-h-screen"
    >
      <h1 className="text-2xl font-bold mb-6 text-white">Admin Product Page</h1>

      {loading ? (
        <motion.p className="text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          Loading products...
        </motion.p>
      ) : products.length === 0 ? (
        <motion.p className="text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          No products found.
        </motion.p>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden relative p-6"
        >
          <table className="w-full border-collapse text-left rounded-lg table-auto">
            <thead className="bg-[#D8AE7E] text-white">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Product Name</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Description</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product, index) => (
                <motion.tr
                  key={product.productId || index}
                  className="hover:bg-[#F5E1C0] cursor-pointer transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{product.productName}</td>
                  <td className="p-4 font-semibold text-green-600 min-w-[120px]">LKR {product.price.toFixed(2)}</td>
                  <td className="p-4">{product.stock}</td>
                  <td className="p-4 truncate max-w-xs">{product.description}</td>
                  <td className="p-4 flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-1 px-3 py-1 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white"
                      onClick={() => navigate("/admin/products/editProducts", { state: { product } })}
                    >
                      <FaEdit /> Edit
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-1 px-3 py-1 text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <FaTrashAlt /> Delete
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          <Link to="/admin/products/addProducts" className="fixed right-8 bottom-8 text-white bg-[#cc893c] p-6 rounded-full shadow-md hover:bg-[#b98e67]">
            <FaPlus className="text-lg" />
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}
