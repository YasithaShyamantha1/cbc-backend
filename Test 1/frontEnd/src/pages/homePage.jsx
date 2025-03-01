import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import LoginPage from './loginPage';
import ProductOverview from './homePages/productOverview';
import ProductPage from "./homePages/Product";
import Cart from "./homePages/cartPage";
import ShippingPage from "./homePages/shipping";
import MyOrdersPage from "./homePages/orders";
import AboutUsPage from "./homePages/AboutUsPage";
import ImageSlider from "../components/ImageSlider";
import Footer from "../components/Footer";

export default function HomePage() {
    const sliderImages = [
        "/images/6.jpeg",
        "/images/7.jpeg",
        "/images/8.webp",
    ];

    return (
        <div className="h-screen w-full flex flex-col">
            <Header />
            
            <div className="flex-grow">
                <Routes> 
                    <Route path="/*" element={<ImageSlider images={sliderImages} />} />
                    <Route path="/productInfo/:id" element={<ProductOverview />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/product" element={<ProductPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/shipping" element={<ShippingPage />} />
                    <Route path="/orders" element={<MyOrdersPage />} />
                    <Route path="/about" element={<AboutUsPage />} />
                </Routes>
            </div>

            <Footer />
        </div> 
    );
}