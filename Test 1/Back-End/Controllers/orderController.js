import Order from "../Models/order.js";
import { isCustomer } from "./userController.js";

export async function createOrder(req, res) {
    // Check if the user is a customer
    if (!isCustomer(req)) {
        return res.json({
            message: "Please login as Customer to create Order",
        });
    }

    try {
        // Fetch the latest order to generate a new Order ID
        const latestOrder = await Order.find().sort({ date: -1 }).limit(1);
        let orderId;

        if (latestOrder.length === 0) {
            orderId = "CBC0001";
        } else {
            const currentOrderId = latestOrder[0].orderId; // Correct typo `Orde.orderId`
            const numberString = currentOrderId.replace("CBC", "");
            const number = parseInt(numberString); // Fix `pareInt` typo
            const newNumber = (number + 1).toString().padStart(4, "0");
            orderId = "CBC" + newNumber;
        }

        // Add order ID and email to the order data
        const newOrderData = req.body;

       const newProductArray = []

       for(let i=0; i<req.body.orderedItems;i++){
        const product = await Product.findOne({
            productId : newOrderData.orderItems[i].productId

        })
        
        if(product == null){
            res.json({
                message:"product with id" + newOrderData.orderItems[i].productId
                + "not found"
            })
            return
        }
        newProductArray[i]={
            productId : product.productId,
            price : product.price,
            quantity : newOrderData.orderedItems[i].quantity,
            image: product.images[0]
        }

 }
       
         console.log(newProductArray)

         newOrderData.orderedItems = newProductArray





        newOrderData.orderId = orderId;
        newOrderData.email = req.user.email;

        // Save the order in the database
        const order = new Order(newOrderData);
        await order.save();

        // Send success response
        return res.json({
            message: "Order Created",
        });
    } catch (error) {
        // Handle errors
        return res.status(500).json({
            message: error.message,
        });
    }
}

export async function getOrders(req, res) {
    try {
        const orders = await Order.find({ email: req.user.email });
        // Send the orders as response
        return res.json(orders);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

export async function getQuote(req, res) {
  
    try {
      const newOrderData = req.body;
  
      const newProductArray = [];
  
      let total = 0;
      let labeledTotal = 0;
      console.log(req.body)
  
      for (let i = 0; i < newOrderData.orderedItems.length; i++) {
        const product = await Product.findOne({
          productId: newOrderData.orderedItems[i].productId,
        });
  
        if (product == null) {
          res.json({
            message:
              "Product with id " +
              newOrderData.orderedItems[i].productId +
              " not found",
          });
          return;
        }
        labeledTotal += product.price * newOrderData.orderedItems[i].qty;
        total += product.lastPrice * newOrderData.orderedItems[i].qty;
        newProductArray[i] = {
          name: product.productName,
          price: product.lastPrice,
          labeledPrice: product.price,
          quantity: newOrderData.orderedItems[i].qty,
          image: product.images[0],
        };
      }
      console.log(newProductArray);
      newOrderData.orderedItems = newProductArray;
      newOrderData.total = total;
  
      res.json({
        orderedItems: newProductArray,
        total: total,
        labeledTotal: labeledTotal,
      });
  
  
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
  
