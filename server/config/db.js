import mongoose from "mongoose";

const connectDB= async()=>{
    try {
        mongoose.connection.on('connected', () => {
            console.log('MongoDB connection established successfully');
        });
        await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`)

        
    } catch (error) {
        console.log(error);
        
    }
}

export default connectDB;