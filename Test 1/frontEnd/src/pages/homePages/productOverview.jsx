import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import ProductNotFound from "./productNotFound";
import { addToCart } from "../../utils/cartFunction";

export default function ProductOverview() {
  const { id } = useParams();
  const productId = id;
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const [activeImage, setActiveImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/products/" + productId)
      .then((res) => {
        if (!res.data) {
          setStatus("not Found");
        } else {
          setProduct(res.data);
          setActiveImage(res.data.images[0]);
          setStatus("found");
        }
      })
      .catch(() => {
        setStatus("not Found");
      });
  }, [id]);

  function onAddToCartClick() {
    addToCart(product.productId, 1);
    toast.success(`${product.productName} added to cart`);
  }

  function onBuyNowClick() {
    navigate("/shipping", {
      state: {
        items: [
          {
            productId: product.productId,
            qty: 1,
          },
        ],
      },
    });
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center">
      {status === "loading" && (
        <div className="w-full h-screen flex items-center justify-center">
          <motion.div
            className="animate-spin rounded-full h-32 w-32 border-t-4 border-gray-400 border-b-blue-500"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
        </div>
      )}

      {status === "not Found" && <ProductNotFound />}

      {status === "found" && (
        <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Image Section */}
          <div className="md:col-span-5 flex flex-col items-center gap-4">
            <div className="relative w-full">
              <img
                src={activeImage}
                alt="Main Product"
                className="w-full object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-16 object-cover rounded cursor-pointer border ${
                    activeImage === image ? "border-blue-500" : "border-gray-300"
                  }`}
                  onClick={() => setActiveImage(image)}
                />
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="md:col-span-7 flex flex-col gap-6">
            <h1 className="text-3xl font-bold text-gray-800">{product.productName}</h1>
            <h2 className="text-lg text-gray-500">{product.altNames.join(" | ")}</h2>

            <div className="text-3xl">
              {product.price > product.lastPrice && (
                <span className="line-through text-red-500 mr-2">LKR.{product.price}</span>
              )}
              <span className="text-green-600 font-bold">LKR.{product.lastPrice}</span>
            </div>

            <p className="text-gray-600">{product.description}</p>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-500">Ships to: Ratnapura, Sabaragamuwa</p>
              <p className="text-sm text-gray-500">Stock available: {product.stock} units</p>
            </div>

            <div className="flex flex-col gap-4 md:flex-row">
              <motion.button
                onClick={onBuyNowClick}
                className="w-full md:w-auto bg-red-500 text-white py-3 px-6 rounded-md shadow-md hover:bg-red-600"
                whileHover={{ scale: 1.05 }}
              >
                Buy Now
              </motion.button>

              <motion.button
                onClick={onAddToCartClick}
                className="w-full md:w-auto bg-yellow-500 text-white py-3 px-6 rounded-md shadow-md hover:bg-yellow-600"
                whileHover={{ scale: 1.05 }}
              >
                Add to Cart
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
