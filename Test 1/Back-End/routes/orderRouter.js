import express from 'express';
import {createOrder, getOrders, getQuote} from '../Controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post("/",createOrder)
orderRouter.get("/",getOrders)
orderRouter.post("/quote",getQuote)

export default orderRouter;
