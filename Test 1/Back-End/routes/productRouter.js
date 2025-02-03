import express from 'express';
import { createProduct,deleteProduct,getProduct,getProductById,searchProducts,updateProduct } from '../Controllers/productController.js';

const productRouter = express.Router();

productRouter.post("/", createProduct)
productRouter.get("/",getProduct)
productRouter.get("/search/:query",searchProducts)
productRouter.delete("/:productId",deleteProduct)
productRouter.put('/:productId',updateProduct);
productRouter.get('/:productId',getProductById);



export default productRouter;