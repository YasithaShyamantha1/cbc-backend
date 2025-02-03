import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadMediaToSupabase from "../../utils/mediaUpload";
import { motion } from "framer-motion";

export default function AddProductForm() {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [alternativeNames, setAlternativeNames] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]); // For previewing images
  const [price, setPrice] = useState("");
  const [lastPrice, setLastPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    // Generate preview URLs
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const altNames = alternativeNames.split(",");

    toast.info("Uploading images...", { position: "top-right" });

    const imgUrls = await Promise.all(
      imageFiles.map((file) => UploadMediaToSupabase(file))
    );

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

    try {
      await axios.post("http://localhost:5000/products", product, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      toast.success("Product added successfully!", { position: "top-right" });

      setTimeout(() => navigate("/admin/products"), 2000);
    } catch (error) {
      toast.error("Failed to add product. Try again.", { position: "top-right" });
    }
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <ToastContainer />
      <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
        Add New Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product ID */}
        <motion.div whileFocus={{ scale: 1.02 }}>
          <label className="block text-gray-600">Product ID</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            required
          />
        </motion.div>

        {/* Product Name */}
        <motion.div whileFocus={{ scale: 1.02 }}>
          <label className="block text-gray-600">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            required
          />
        </motion.div>

        {/* Alternative Names */}
        <motion.div whileFocus={{ scale: 1.02 }}>
          <label className="block text-gray-600">Alternative Names</label>
          <input
            type="text"
            value={alternativeNames}
            onChange={(e) => setAlternativeNames(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            placeholder="Comma-separated values"
          />
        </motion.div>

        {/* Product Images */}
        <motion.div>
          <label className="block text-gray-600">Product Images</label>
          <input
            type="file"
            className="w-full p-2 border rounded-md"
            onChange={handleImageChange}
            multiple
          />
          <div className="mt-3 flex space-x-3">
            {previewImages.map((src, index) => (
              <img key={index} src={src} alt="Preview" className="w-16 h-16 rounded-md shadow-md" />
            ))}
          </div>
        </motion.div>

        {/* Price */}
        <motion.div whileFocus={{ scale: 1.02 }}>
          <label className="block text-gray-600">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            required
          />
        </motion.div>

        {/* Last Price */}
        <motion.div whileFocus={{ scale: 1.02 }}>
          <label className="block text-gray-600">Last Price</label>
          <input
            type="number"
            value={lastPrice}
            onChange={(e) => setLastPrice(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </motion.div>

        {/* Stock Quantity */}
        <motion.div whileFocus={{ scale: 1.02 }}>
          <label className="block text-gray-600">Stock Quantity</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            required
          />
        </motion.div>

        {/* Description */}
        <motion.div whileFocus={{ scale: 1.02 }}>
          <label className="block text-gray-600">Product Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            rows="4"
            required
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all"
          >
            Add Product
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
}
