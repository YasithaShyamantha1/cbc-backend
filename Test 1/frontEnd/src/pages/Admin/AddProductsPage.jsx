import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddProductForm() {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [alternativeNames, setAlternativeNames] = useState("");
  const [imageUrls, setImageUrls] = useState("");
  const [price, setPrice] = useState("");
  const [lastPrice, setLastPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const altNames = alternativeNames.split(",");
    const imgUrls = imageUrls.split(",");

    const product = {
      productId,
      productName,
      altNames,
      images: imgUrls,
      price,
      lastPrice,
      stock,
      description,
    };

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post("http://localhost:5000/product", product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Product added successfully!", { position: "top-right" });
      
      // Clear form fields after successful submission
      setProductId("");
      setProductName("");
      setAlternativeNames("");
      setImageUrls("");
      setPrice("");
      setLastPrice("");
      setStock("");
      setDescription("");

      // Navigate to the admin/products page
      setTimeout(() => {
        navigate("/admin/products");
      }, 2000); // Navigate after showing success toast
    } catch (error) {
      console.error("Error adding product:", error);

      if (error.response && error.response.status === 404) {
        toast.error("API endpoint not found. Please check your backend server.", { position: "top-right" });
      } else if (error.response && error.response.status === 401) {
        toast.error("Unauthorized. Please check your authentication token.", { position: "top-right" });
      } else {
        toast.error("An error occurred while adding the product. Please try again.", { position: "top-right" });
      }
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="productId" className="block text-gray-700">Product ID</label>
          <input
            type="text"
            id="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Insert Product ID"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="productName" className="block text-gray-700">Product Name</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter Product Name"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="alternativeNames" className="block text-gray-700">Alternative Names</label>
          <input
            type="text"
            id="alternativeNames"
            value={alternativeNames}
            onChange={(e) => setAlternativeNames(e.target.value)}
            placeholder="Enter Alternative Names (comma separated)"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="imageUrls" className="block text-gray-700">Product Images (URLs)</label>
          <input
            type="text"
            id="imageUrls"
            value={imageUrls}
            onChange={(e) => setImageUrls(e.target.value)}
            placeholder="Enter Image URLs (comma separated)"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter Price"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="lastPrice" className="block text-gray-700">Last Price</label>
          <input
            type="number"
            id="lastPrice"
            value={lastPrice}
            onChange={(e) => setLastPrice(e.target.value)}
            placeholder="Enter Last Price"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="stock" className="block text-gray-700">Stock Quantity</label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter Stock Quantity"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Product Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Product Description"
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="4"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
