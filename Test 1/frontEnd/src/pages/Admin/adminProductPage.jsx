import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import icons

export default function AdminProductPage() {
  const [products, setProducts] = useState([
    {
      productId: "BEAUTY001",
      productName: "Hydrating Face Serum",
      altNames: ["Moisturizing Face Serum", "Skin Brightening Serum"],
      images: [
        "https://example.com/beauty-product1.jpg",
        "https://example.com/beauty-product2.jpg",
        "https://example.com/beauty-product3.jpg",
      ],
      price: 29.99,
      lastPrice: 39.99,
      stock: 100,
      description:
        "A lightweight, hydrating face serum enriched with hyaluronic acid and vitamin C to boost skin radiance and improve texture. Perfect for all skin types.",
    },
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/product")
      .then((res) => {
        console.log("API Response:", res.data);
        setProducts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Product Page</h1>
      <div className="overflow-x-auto">
        <Link to={"/admin/products/addProducts"}  className="absolute right-[35px] bottom-[25px] text-[25px] bg-[#2489ee] text-white p-5 rounded-xl hover:bg-[#a4c4ef] hover:rounded-full"><FaPlus/></Link>
        <table className="table-auto w-full text-sm text-left text-gray-500 border border-gray-200">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-3 border">#</th>
              <th className="px-6 py-3 border">Product Name</th>
              <th className="px-6 py-3 border">Price</th>
              <th className="px-6 py-3 border">Stock</th>
              <th className="px-6 py-3 border">Description</th>
              <th className="px-6 py-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.productId || index}
                className="bg-white border-b hover:bg-gray-100"
              >
                <td className="px-6 py-4 border">{index + 1}</td>
                <td className="px-6 py-4 border">{product.productName}</td>
                <td className="px-6 py-4 border">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4 border">{product.stock}</td>
                <td className="px-6 py-4 border truncate max-w-xs">
                  {product.description}
                </td>
                <td className="px-6 py-4 border flex gap-4">
                  {/* Edit Button */}
                  <button
                    className="flex items-center gap-1 px-3 py-1 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white"
                    onClick={() => console.log("Edit", product.productId)}
                  >
                    <FaEdit /> Edit
                  </button>

                  {/* Delete Button */}
                  <button
                    className="flex items-center gap-1 px-3 py-1 text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white"
                    onClick={() => console.log("Delete", product.productId)}
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
