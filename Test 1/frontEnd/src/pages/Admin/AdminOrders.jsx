import axios from "axios";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/order");
        setOrders(res.data);
      } catch (err) {
        toast.error("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const calculateTotal = (orderedItems) => {
    return orderedItems.reduce(
      (total, item) => total + (item.price || 0) * (item.quantity || 1),
      0
    );
  };

  const handleUpdateOrder = async () => {
    if (!selectedOrder) return;
    try {
      await axios.put(import.meta.env.VITE_BACKEND_URL + `/order/${selectedOrder.orderId}`, {
        status: updatedStatus,
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === selectedOrder.orderId ? { ...order, status: updatedStatus } : order
        )
      );
      toast.success("Order updated successfully!");
      setSelectedOrder(null);
    } catch (err) {
      toast.error("Failed to update order. Please try again.");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="w-full h-full flex flex-col items-center p-6 bg-gray-100 min-h-screen"
    >
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Orders</h1>
      {loading ? (
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
          className="text-gray-600"
        >
          Loading orders...
        </motion.p>
      ) : orders.length === 0 ? (
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
          className="text-gray-600"
        >
          No orders found.
        </motion.p>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <table className="w-full border-collapse text-left">
            <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <motion.tr
                  key={order.orderId}
                  className="hover:bg-gray-50 cursor-pointer transition-all"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => { setSelectedOrder(order); setUpdatedStatus(order.status || "Pending"); }}
                >
                  <td className="p-4">{order.orderId}</td>
                  <td className="p-4 font-semibold text-blue-600">{order.status || "Pending"}</td>
                  <td className="p-4">{order.date ? new Date(order.date).toLocaleDateString() : "N/A"}</td>
                  <td className="p-4 font-semibold text-green-600">LKR {calculateTotal(order.orderedItems).toFixed(2)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      <AnimatePresence>
        {selectedOrder && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div 
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              exit={{ y: -50 }}
              className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-lg font-bold mb-4">Order Details</h2>
              <p><span className="font-semibold">Order ID:</span> {selectedOrder.orderId}</p>
              <p>
                <span className="font-semibold">Status:</span> 
                <select className="ml-2 p-1 border rounded" value={updatedStatus} onChange={(e) => setUpdatedStatus(e.target.value)}>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </p>
              <div className="flex justify-end mt-4 space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  onClick={handleUpdateOrder}
                >
                  Update
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  onClick={() => setSelectedOrder(null)}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
