import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadMediaToSupabase from "../../utils/mediaUpload";

const key =`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllamphcGt0cHBwdWZjeHFoZ3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2NzU2MDEsImV4cCI6MjA1MjI1MTYwMX0.EN51cs6W3K9gh5TgkIN2q6DlwJq6cUlVeewd1HhMo_0
`
const url="https://iejjapktpppufcxqhgqz.supabase.co"

export default function AddProductForm() {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [alternativeNames, setAlternativeNames] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [price, setPrice] = useState("");
  const [lastPrice, setLastPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // Helper function to upload images and get URLs
  const getImageUrls = async () => {
    const imageUrlsArray = [];
    for (let i = 0; i < imageFiles.length; i++) {
      const url = await UploadMediaToSupabase(imageFiles[i]); // Upload each file
      imageUrlsArray.push(url); // Collect the URL
      console.log(`Image ${i + 1} uploaded: ${url}`); // Log the uploaded URL
    }
    return imageUrlsArray;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const altNames = alternativeNames.split(","); // Parse alternative names
    console.log("Uploading images...");
    const imgUrls = await getImageUrls(); // Collect uploaded image URLs
    console.log("All images uploaded:", imgUrls);

    const product = {
      productId,
      productName,
      altNames,
      images: imgUrls, // Use uploaded URLs
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
      setImageFiles([]);
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

  // Return UI
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
          <label htmlFor="imageUrls" className="block text-gray-700">Product Images</label>
          <input
            type="file"
            id="imageUrls"
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) => setImageFiles(Array.from(e.target.files))} // Handle multiple files
            multiple
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
