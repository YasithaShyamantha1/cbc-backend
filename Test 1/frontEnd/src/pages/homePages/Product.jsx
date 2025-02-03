import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import ProductCard from "../../components/productCard";
import { motion } from "framer-motion";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState('loading');
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (loadingStatus === "loading") {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/products").then((res) => {
                setProducts(res.data);
                setFilteredProducts(res.data);
                setLoadingStatus('loaded');
            }).catch((err) => toast.error('Failed to fetch products'));
        }
    }, [loadingStatus]);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.trim() === "") {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(product =>
                product.productName.toLowerCase().includes(query.toLowerCase())
            ));
        }
    };

    return (
        <div className="w-full h-full bg-gray-100 overflow-y-scroll flex flex-col items-center p-6 min-h-screen">
            <motion.div 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }} 
                className="relative w-full max-w-lg mb-6"
            >
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full p-4 pl-12 text-lg border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-all duration-300 ease-in-out hover:shadow-lg"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
            </motion.div>
            <motion.div 
                className="w-full flex flex-wrap justify-center gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                {filteredProducts.map(product => (
                    <motion.div 
                        key={product.id} 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <ProductCard product={product} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
