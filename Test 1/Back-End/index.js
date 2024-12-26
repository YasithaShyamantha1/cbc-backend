import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import productRouter from './routes/productRouter.js';
import orderRouter from './routes/orderRouter.js';
import cors from 'cors';

const app = express();
dotenv.config();

const port = process.env.PORT;
const mongoUrl = process.env.MONGO_DB_URI;

app.use(cors())

mongoose.connect(mongoUrl, {});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("DataBase Connected");
});

app.use(bodyParser.json());

// Middleware for JWT verification
app.use((req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader ? authHeader.replace("Bearer ", "") : null;

    // Log the token to debug
    console.log("Token from header:", token);

    if (token) {
        jwt.verify(token, "cbc-secret-key", (error, decoded) => {
            if (!error) {
                req.user = decoded; // Attach decoded data to the request object
            } else {
                console.error("JWT verification failed:", error.message);
                return res.status(401).json({ message: "Invalid Token" }); // Respond with an error if token is invalid
            }
        });
    }

    next(); // Proceed to next middleware or route handler
});

app.use("/User", userRouter);
app.use("/product",productRouter);
app.use("/order",orderRouter);
app.listen(5000, () => {
    console.log("Server is running on port 5000!");
});
