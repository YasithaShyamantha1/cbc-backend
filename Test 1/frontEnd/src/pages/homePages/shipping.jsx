import { useLocation, useNavigate } from "react-router-dom";
import CartCard from "../../components/cartCard";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ShippingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.items;
  const [total, setTotal] = useState(0);
  const [labeledTotal, setLabeledTotal] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!cart) {
      toast.error("No items received");
      navigate("/cart");
      return;
    }

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/order/quote", {
        orderedItems: cart,
      })
      .then((res) => {
        if (res.data.total != null) {
          setTotal(res.data.total);
          setLabeledTotal(res.data.labeledTotal);
        }
      })
      .catch((err) => {
        toast.error("Failed to fetch order quote. Please try again.");
        console.error(err);
      });
  }, [cart, navigate]);

  function validateInputs() {
    if (!name.trim()) {
      toast.error("Please enter your name.");
      return false;
    }
    if (!address.trim()) {
      toast.error("Please enter your address.");
      return false;
    }
    if (!phone.trim() || !/^\d{10}$/.test(phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return false;
    }
    return true;
  }

  function createOrder() {
    if (!validateInputs()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to place an order.");
      return;
    }

    axios
      .post(
        import.meta.env.VITE_BACKEND_URL + "/order",
        {
          orderedItems: cart,
          name,
          address,
          phone,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        toast.success("Order placed successfully!");
        navigate("/orders");
      })
      .catch((err) => {
        toast.error("Failed to place order. Please try again.");
        console.error(err);
      });
  }

  if (!cart) {
    return null;
  }

  return (
    <div className="w-full h-full bg-gray-100 p-4">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Shipping Details</h1>
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Address</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>

        <h2 className="text-xl font-bold mt-6 mb-4">Order Summary</h2>
        
        {/* Table Wrapper for Responsiveness */}
        <div className="w-full overflow-x-auto">
          <table className="table-fixed w-full border-collapse border border-gray-300 min-w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="border border-gray-300 p-2 w-16">Image</th>
                <th className="border border-gray-300 p-2 w-1/3">Product Name</th>
                <th className="border border-gray-300 p-2 w-1/5">Product ID</th>
                <th className="border border-gray-300 p-2 w-1/12">Qty</th>
                <th className="border border-gray-300 p-2 w-1/6">Price</th>
                <th className="border border-gray-300 p-2 w-1/6">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <CartCard
                  key={item.productId}
                  productId={item.productId}
                  qty={item.qty}
                  price={item.price}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Total Summary */}
        <h1 className="text-lg font-bold text-gray-700 mt-4">
          Total: LKR. {labeledTotal.toFixed(2)}
        </h1>
        <h1 className="text-lg font-bold text-gray-700">
          Discount: LKR. {(labeledTotal - total).toFixed(2)}
        </h1>
        <h1 className="text-lg font-bold text-gray-700 mb-4">
          Grand Total: LKR. {total.toFixed(2)}
        </h1>

        {/* Checkout Button with Updated Color */}
        <button
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg w-full"
          onClick={createOrder}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
