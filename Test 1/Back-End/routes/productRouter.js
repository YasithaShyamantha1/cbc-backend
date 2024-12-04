import express from 'express';
import{createProduct, deleteProduct,getProduct}
from '../Controllers/productContoller.js';

const productRouter = express.Router();

productRouter.get("/",getProduct);
productRouter.get("/",);
productRouter.post("/login",createProduct);
productRouter.delete("/",deleteProduct);





export default productRouter;
