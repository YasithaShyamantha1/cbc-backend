import axios from 'axios';
import { useEffect } from 'react';

export default function AdminProductPage() {
  useEffect(() => {
    axios
      .get('http://localhost:5000/products')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>Admin Product Page djnshifbjknxgishvmshubvijsengsegfbseyufesfsegfysgasjf8aw8q0aefuseifaecdsuvklssvsuv</h1>
    </div>
  );
}
