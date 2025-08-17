import express from 'express';
import "dotenv/config";
import cors from "cors"
import connectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './controllers/clerkWebhooks.js';
import userRouter from './routes/userRoutes.js';
import hotelRouter from './routes/hotelRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import roomRouter from './routes/roomRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import bodyParser from 'body-parser';


connectDB();
connectCloudinary();

const app=express();
app.use(cors()); //Enable CORS for all routes
 

app.use(express.json());
app.use(clerkMiddleware());

//API to listen Clerk
// app.use("/api/clerk",clerkWebhooks)
app.use(
  "/api/clerk", bodyParser.raw({ type: "application/json" }),clerkWebhooks
);

app.get('/', (req,res)=>res.send("API is running ...")); 
app.use('/api/user',userRouter);
app.use('/api/hotel', hotelRouter);
app.use('/api/room', roomRouter);
app.use('/api/bookings',bookingRouter);


const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})
