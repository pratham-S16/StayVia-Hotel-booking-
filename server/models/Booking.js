import mongoose from "mongoose";

const bookingSchema= new mongoose.Schema({
    user: {type: String, required: true, ref: "User"},
    room: {type: String, required: true, ref: "Room"},
    hotel: {type: String, required: true, ref: "Hotel"},
    checkInDate: {type: Date, required: true},
    checkOutDate: {type: Date, required: true},
    totalPrice: {type: Number, required: true},
    guests: {type: Number, required: true},
    status: {type: String, required: true, enum: ["pending","confirmed", "cancelled"], default: "pending"},
    paymentMethod:{type: String, default: "Pay at Hotel",required: true, enum: ["Pay at Hotel", "Online Payment"]},
    isPaid: {type: Boolean, default: false},

},{timestamps: true});


const Booking= mongoose.model("Booking", bookingSchema);

export default Booking;