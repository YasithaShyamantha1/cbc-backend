import { Link } from "react-router-dom";

export default function Header(){
    return(
        <header className="bg-white w-full h-[100px] relative flex justify-center items-center ">
            <img src="/logo.png" className="cursor-pointer w-[100px] h-[100px] rounded-full absolute left-[10px] "/>
<div className="h-full flex items-center w-[500px] justify-evenly">

            <Link to="/" className="text-accent font-bold text-xl hover:border-b border-accent">Home</Link>
            <Link to="/product" className="text-accent font-bold text-xl hover:border-b border-accent">Products</Link>
            <Link to="/" className="text-accent font-bold text-xl hover:border-b border-accent">About Us</Link>
            <Link to="/" className="text-accent font-bold text-xl hover:border-b border-accent">Contact Us</Link>
            <Link to="/cart" className="text-accent font-bold text-xl hover:border-b border-accent">Cart</Link>
            </div>    
        </header>
    )
}