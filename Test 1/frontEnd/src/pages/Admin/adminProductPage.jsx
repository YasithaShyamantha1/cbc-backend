import axios from 'axios';
import { useEffect, useState } from 'react';

export default function AdminProductPage() {

const [products,setProducts] = useState([

  {
    "productId": "BEAUTY001",
    "productName": "Hydrating Face Serum",
    "altNames": [
        "Moisturizing Face Serum",
        "Skin Brightening Serum"
    ],
    "images": [
        "https://example.com/beauty-product1.jpg",
        "https://example.com/beauty-product2.jpg",
        "https://example.com/beauty-product3.jpg"
    ],
    "price": 29.99,
    "lastPrice": 39.99,
    "stock": 100,
    "description": "A lightweight, hydrating face serum enriched with hyaluronic acid and vitamin C to boost skin radiance and improve texture. Perfect for all skin types."
}

])

console.log(products)

useEffect(
  ()=>{
    axios.get("http://localhost:5000/product").then((res)=>{
      console.log(res.data)
      setProducts(res.data)
      console.log(
        {
         discountTitle : "Summer Sale",
         products : products[0] 
        }
      )

      console.log({
        discountTitle : "Summer Sale"
      })
  }
)

 },[]
 )
 
 return <div>
  <h1>Admin Product Page</h1>
{
  products.map(
    (product,index)=>{
      return(
        <div key = {product._id}>
        {index}
        {product.productName}
        </div>
      )
    }
  )
}


 </div>
}
