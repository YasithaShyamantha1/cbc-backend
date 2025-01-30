import axios from "axios";
import { useEffect, useState } from "react";
import { deleteItem } from "../utils/cartFunction";

export default function CartCard(props) {
  const { productId, qty, onItemRemove } = props;

  const [product, setProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/products/" + productId)
        .then((response) => {
          if (response.data != null) {
            setProduct(response.data);
            setLoaded(true);
          } else {
            deleteItem(productId); // Remove invalid product
          }
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const handleRemove = () => {
    deleteItem(productId); // Remove the item from local storage
    if (onItemRemove) {
      onItemRemove(productId); // Update parent state
    }
  };

  return (
    <>
      {!loaded ? (
        <tr>
          <td colSpan="6" className="text-center py-4">
            Loading...
          </td>
        </tr>
      ) : (
        <tr className="border-b hover:bg-gray-100">
          {/* Product Image */}
          <td className="p-4">
            <img
              src={product?.images[0]}
              alt={product?.productName}
              className="w-[80px] h-[80px] object-cover rounded-md mx-auto"
            />
          </td>

          {/* Product Name */}
          <td className="text-center text-sm font-medium text-gray-800">
            {product?.productName}
          </td>

          {/* Product ID */}
          <td className="text-center text-sm text-gray-500">
            {productId}
          </td>

          {/* Quantity */}
          <td className="text-center text-sm font-medium text-gray-800">
            {qty}
          </td>

          {/* Unit Price */}
          <td className="text-center text-sm text-gray-800">
            LKR. {product?.lastPrice.toFixed(2)}
          </td>

          {/* Total Price */}
          <td className="text-center text-sm font-bold text-gray-900">
            LKR. {(product?.lastPrice * qty).toFixed(2)}
          </td>

          {/* Remove Button */}
          <td className="text-center">
            <button
              className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 focus:outline-none shadow-md transition duration-200"
              onClick={handleRemove}
            >
              Remove
            </button>
          </td>
        </tr>
      )}
    </>
  );
}
