import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import Student from './Models/Student.js';
import studentRouter from './routes/studentRouter.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

// console.log("MongoDB URI:", process.env.MONGO_DB_URI);
const app = express();
dotenv.config();

const port = process.env.PORT;
const mongoUrl = process.env.MONGO_DB_URI


mongoose.connect(mongoUrl,{})

const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("DataBase Connected");
})

app.use(bodyParser.json())


app.use(
    (req,res,next)=>{
        console.log(req.header("Authorization")?.replace("bearer",""))
        console.log(token)

        if(token != null)
        {
           Jwt.verify(token,"cbc-secret-key", (error,
            decoded)=>{
                if(!error){
                      
                    req.user = decoded 

                }
            })

        }
    next()


    })
app.use("/Student",studentRouter)
app.use("/Product",productRouter)
app.use("/User",userRouter)



app.listen(
    5000,
    ()=>{
        console.log("Server is running on prot 5000!");
    }
)