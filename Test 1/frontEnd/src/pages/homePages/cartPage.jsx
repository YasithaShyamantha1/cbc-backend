import { useEffect, useState } from "react";
import { loadCart } from "../../utils/cartFunction";
import CartCard from "../../components/cartCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [labeledTotal, setLabeledTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const cartItems = loadCart();
    setCart(cartItems);

    if (cartItems.length > 0) {
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/order/quote", {
          orderedItems: cartItems,
        })
        .then((res) => {
          if (res.data.total !== null) {
            setTotal(res.data.total);
            setLabeledTotal(res.data.labeledTotal);
          }
        })
        .catch((err) => console.error("Error fetching quote:", err));
    }
  }, []);

  function onOrderCheckOutClick() {
    navigate("/shipping", {
      state: {
        items: cart,
      },
    });
  }

  return (
    <div className="w-full min-h-screen flex flex-col gap-6 items-center p-4 bg-gray-100">
      {/* Table Section */}
      <div className="w-full overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full text-left text-gray-700 border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-800 text-sm md:text-base">
              <th className="py-3 px-2 md:px-4 w-1/6">Image</th>
              <th className="py-3 px-2 md:px-4 w-2/6">Product Name</th>
              <th className="py-3 px-2 md:px-4 w-1/6">Product ID</th>
              <th className="py-3 px-2 md:px-4 w-1/12">Qty</th>
              <th className="py-3 px-2 md:px-4 w-1/6">Price</th>
              <th className="py-3 px-2 md:px-4 w-1/6">Total</th>
              <th className="py-3 px-2 md:px-4 w-1/12 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <CartCard key={item.productId} productId={item.productId} qty={item.qty} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Section */}
      <div className="w-full md:w-2/3 lg:w-1/2 bg-white p-4 rounded-lg shadow-md text-gray-800 flex flex-col gap-3 items-end">
        <h1 className="text-xl md:text-2xl font-bold text-accent">
          Total: LKR. {labeledTotal ? labeledTotal.toFixed(2) : "0.00"}
        </h1>
        <h1 className="text-xl md:text-2xl font-bold text-accent">
          Discount: LKR. {labeledTotal && total ? (labeledTotal - total).toFixed(2) : "0.00"}
        </h1>
        <h1 className="text-xl md:text-2xl font-bold text-accent">
          Grand Total: LKR. {total ? total.toFixed(2) : "0.00"}
        </h1>
        <button
          onClick={onOrderCheckOutClick}
          className="bg-accent hover:bg-accent-light text-white py-3 px-6 rounded-lg w-full md:w-auto"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
