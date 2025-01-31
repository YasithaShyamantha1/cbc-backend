import axios from "axios";
import { useEffect, useState } from "react";
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
    <div className="w-full h-full flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Orders</h1>
      {loading ? (
        <p className="text-gray-600">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
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
                <tr
                  key={order.orderId}
                  className="hover:bg-gray-50 cursor-pointer transition-all"
                  onClick={() => { setSelectedOrder(order); setUpdatedStatus(order.status || "Pending"); }}
                >
                  <td className="p-4">{order.orderId}</td>
                  <td className="p-4 font-semibold text-blue-600">{order.status || "Pending"}</td>
                  <td className="p-4">{order.date ? new Date(order.date).toLocaleDateString() : "N/A"}</td>
                  <td className="p-4 font-semibold text-green-600">LKR {calculateTotal(order.orderedItems).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
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
            <p><span className="font-semibold">Date:</span> {selectedOrder.date ? new Date(selectedOrder.date).toLocaleString() : "N/A"}</p>
            <p><span className="font-semibold">Name:</span> {selectedOrder.name || "N/A"}</p>
            <p><span className="font-semibold">Address:</span> {selectedOrder.address || "N/A"}</p>
            <p><span className="font-semibold">Phone:</span> {selectedOrder.phone || "N/A"}</p>
            <p><span className="font-semibold">Notes:</span> {selectedOrder.notes || "None"}</p>

            <div className="flex justify-end mt-4 space-x-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={handleUpdateOrder}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
