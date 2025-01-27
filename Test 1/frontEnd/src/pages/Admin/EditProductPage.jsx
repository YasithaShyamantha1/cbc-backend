// Updated EditProductPage.jsx
import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadMediaToSupabase from "../../utils/mediaUpload";

const EditProductForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product;

  if (!product) {
    navigate("/admin/products");
    return null;
  }

  const [productId] = useState(product.productId);
  const [productName, setProductName] = useState(product.productName);
  const [alternativeNames, setAlternativeNames] = useState(product.altNames.join(","));
  const [imageFiles, setImageFiles] = useState([]);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  const [description, setDescription] = useState(product.description);

  const getImageUrls = async () => {
    const imageUrlsArray = [];
    for (let i = 0; i < imageFiles.length; i++) {
      const url = await UploadMediaToSupabase(imageFiles[i]);
      imageUrlsArray.push(url);
    }
    return imageUrlsArray;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const altNamesArray = alternativeNames.split(",");
    let imgUrls = [];

    if (imageFiles.length > 0) {
      imgUrls = await getImageUrls();
    } else {
      imgUrls = product.images;
    }

    const updatedProduct = {
      productId,
      productName,
      altNames: altNamesArray,
      images: imgUrls,
      price: parseFloat(price),
      stock: parseInt(stock),
      description,
    };

    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `http://localhost:5000/product/${productId}`,
        updatedProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        toast.success("Product updated successfully!", { position: "top-right" });
        navigate("/admin/products");
      } else {
        toast.error("Failed to update product. Please try again.", { position: "top-right" });
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("An error occurred while updating the product.", { position: "top-right" });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="productName" className="block text-gray-700">Product ID</label>
          <input
          disabled
            type="text"
            id="productId"
            value={productId}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter Product ID"
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
            onChange={(e) => setImageFiles(Array.from(e.target.files))}
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
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
