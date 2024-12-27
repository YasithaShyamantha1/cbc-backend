import axios from 'axios';
import { useEffect } from 'react';

export default function AdminProductPage() {
 axios.get("http://localhost:5000/product").then((res)=>{
  console.log(res)
 })

  return (
    <div>
      <h1>Admin Product Page </h1>
    </div>
  );
}
