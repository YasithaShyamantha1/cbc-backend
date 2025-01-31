import { Link, Routes, Route } from "react-router-dom"; // Added 'Route' to the import statement
import Header from "../components/Header";
import LoginPage from './loginPage';
import ProductOverview from './homePages/productOverview';
import ProductPage from "./homePages/Product";
import Cart from "./homePages/cartPage";
import ShippingPage from "./homePages/shipping";
import MyOrdersPage from "./homePages/orders";




export default function HomePage() {
    return (
        <div className="h-screen w-full">
            <Header />
            <div className="w-full h-[calc(100vh-100px)]">
                <Routes> 
                <Route path="/" element={<h1>Home Page</h1>} />
                <Route path="/productInfo/:id" element={<ProductOverview/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/product" element={<ProductPage/>} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/shipping" element={<ShippingPage/>} />
                <Route path="/orders" element={<MyOrdersPage/>} />
                </Routes>
            </div>
        </div> 
    );
}
