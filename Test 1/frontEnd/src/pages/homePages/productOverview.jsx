import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductNotFound from "./productNotFound";
import ImageSlider from "../../components/imageSlider";
import { addToCart } from "../../utils/cartFunction";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function ProductOverview() {
  const { id } = useParams();
  const productId = id;
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const  navigate = useNavigate();// found, notfound, loading
  console.log(id);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/products/" + productId)
      .then((res) => {
        console.log("Response Data:", res.data);
        if (!res.data) {
          setStatus("not Found");
        } else {
          setProduct(res.data);
          setStatus("found");
        }
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setStatus("not Found");
      });
  }, [id]);

  function onAddtoCartClick() {
    addToCart(product.productId, 1);
    toast.success(product.productId + " Added to Cart");
  }
  function onBuyNowClick(){
    navigate("/shipping",{
      state:{
        items: [
          {
            productId: product.productId,
            qty: 1
          }
        ]
      }
    })
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-100">
      {status === "loading" && (
        <div className="w-full h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-2 border-gray-500 border-b-accent border-b-4"></div>
        </div>
      )}

      {status === "not Found" && <ProductNotFound />}

      {status === "found" && (
        <div className="w-full max-w-screen-lg mx-auto flex flex-col md:flex-row items-center justify-center gap-6 p-4">
          {/* Mobile Header for Product Name */}
          <h1 className="text-3xl font-bold text-gray-800 text-center md:hidden">
            {product.productName}
          </h1>

          {/* Image Slider Section */}
          <div className="w-full h-60 sm:h-80 md:h-full md:w-[40%] lg:w-[35%] flex items-center justify-center">
            <ImageSlider images={product.images} />
          </div>

          {/* Product Details Section */}
          <div className="w-full md:w-[60%] lg:w-[65%] p-4 flex flex-col gap-4">
            {/* Desktop Header for Product Name */}
            <h1 className="text-3xl font-bold text-gray-800 hidden md:block">
              {product.productName}
            </h1>
            <h1 className="text-xl font-bold text-gray-500">
              {product.altNames.join(" | ")}
            </h1>
            <p className="text-lg text-gray-600">
              {product.price > product.lastPrice && (
                <span className="line-through text-red-500">
                  LKR.{product.price}
                </span>
              )}{" "}
              <span>{"LKR." + product.lastPrice}</span>
            </p>
            <p className="text-base text-gray-600 line-clamp-3">
              {product.description}
            </p>
            <button
              onClick={onBuyNowClick}
              className="bg-white text-accent border-1 border-accent shadow-gray-500 hover:shadow-primary  hover:border-[3px] py-2 px-4 rounded-lg w-full md:w-auto"
            >
             Buy Now
            </button>
            <button
              onClick={onAddtoCartClick}
              className="bg-accent text-white  shadow-gray-500 hover:shadow-primary  hover:border-[3px] py-2 px-4 rounded-lg w-full md:w-auto"
            >
              Add to cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
