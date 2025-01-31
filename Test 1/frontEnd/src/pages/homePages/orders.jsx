import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // Fetch orders on component mount
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/order"
        );
        setOrders(res.data);
      } catch (err) {
        toast.error("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Calculate total price
  const calculateTotal = (orderedItems) => {
    return orderedItems.reduce(
      (total, item) => total + (item.price || 0) * (item.quantity || 1),
      0
    );
  };

  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <h1 className="text-xl font-bold mb-4">My Orders</h1>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="w-full max-w-4xl border border-gray-200 shadow-sm rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border-b text-left">Order ID</th>
              <th className="p-2 border-b text-left">Status</th>
              <th className="p-2 border-b text-left">Date</th>
              <th className="p-2 border-b text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.orderId}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedOrder(order)}
              >
                <td className="p-2 border-b">{order.orderId}</td>
                <td className="p-2 border-b">{order.status || "Pending"}</td>
                <td className="p-2 border-b">
                  {order.date ? new Date(order.date).toLocaleDateString() : "N/A"}
                </td>
                <td className="p-2 border-b">
                  LKR {calculateTotal(order.orderedItems).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Order Details</h2>
            <p>
              <span className="font-semibold">Order ID:</span> {selectedOrder.orderId}
            </p>
            <p>
              <span className="font-semibold">Status:</span> {selectedOrder.status || "Pending"}
            </p>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {selectedOrder.date ? new Date(selectedOrder.date).toLocaleString() : "N/A"}
            </p>
            <p>
              <span className="font-semibold">Name:</span> {selectedOrder.name || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Address:</span> {selectedOrder.address || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {selectedOrder.phone || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Notes:</span> {selectedOrder.notes || "None"}
            </p>

            <h3 className="text-md font-bold mt-4">Ordered Items:</h3>
            <div className="border-t border-gray-200 mt-2 pt-2">
              {selectedOrder.orderedItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 border-b py-2">
                  <img
                    src={item.image || "https://via.placeholder.com/50"}
                    alt={item.name || "Item"}
                    className="w-16 h-16 rounded-md"
                  />
                  <div>
                    <p>
                      <span className="font-semibold">Name:</span> {item.name || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Price:</span> LKR{" "}
                      {item.price ? item.price.toFixed(2) : "0.00"}
                    </p>
                    <p>
                      <span className="font-semibold">Quantity:</span>{" "}
                      {item.quantity || 1}
                    </p>
                    <p>
                      <span className="font-semibold">Subtotal:</span> LKR{" "}
                      {(item.price * item.quantity || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-4">
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
