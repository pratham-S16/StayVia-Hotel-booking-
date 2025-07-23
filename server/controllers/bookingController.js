import Booking from "../models/Booking.js"
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js"

//function to check avaailability of room
const checkRoomAvailability = async ({checkInDate, checkOutDate,room}) => {
    try {
        const bookings= await Booking.find({
            room,
            checkInDate: {$lte: checkOutDate},
            checkOutDate: {$gte: checkInDate},
        })
        const isAvailable =bookings.length === 0;
        return isAvailable;
    } catch (error) {
        console.log(error.message);
    }
}

//APi to check availabilty of room

export const checkAvailabilityAPI= async(req,res)=>{
    try {
        const {room, checkInDate, checkOutDate}= req.body;
        const isAvailable= await checkRoomAvailability({checkInDate, checkOutDate, room});
        res.json({success:true, isAvailable})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//API to create a new booking

export const createBooking= async(req,res)=>{
    try {
        const {room, checkInDate, checkOutDate, guests}= req.body;
        const user= req.user._id;
        //before booking check availability
        const isAvailable= await checkRoomAvailability({checkInDate, checkOutDate, room});
        if(!isAvailable){
            return res.json({success: false, message: "Room is not available for the selected dates."});
        }
        //get  total price off room
        const roomData= await Room.findById(room).populate("hotel");
        let totalPrice= roomData.pricePerNight;

        //find price based on total days stay
        const checkIn= new Date(checkInDate);
        const checkOut= new Date(checkOutDate);
        const diff =checkOut.getTime()- checkIn.getTime();
        const nights= Math.ceil(diff/(1000*3600*24));

        totalPrice*=nights;

        const booking= Booking.create({
            user,
            room,
            hotel: roomData.hotel._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice,
        })
        res.json({success:true, message: "Room Successfully Booked"})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    
    }
}

//API TO GET ALL BOOKING OF PARTICULAR USER
// GET /api/bookings/user

export const getUserBookings= async(req,res)=>{
    try {
     const user=req.user_id;
     const bookings= Booking.find({user}).populate("room hotel").sort({createdAt:-1})
      res.json({success:true, bookings});

    } catch (error) {
     res.json({success:false, message: "Failed to fetch bookings"})

}
}

export const getHotelBookings= async(req,res)=>{
    try {
        const hotel=await Hotel.findOne({owner:req.auth.user_id});
        if(!hotel)
        {
            res.json({success:false, message:"Hotel Not found"});
        }
        const bookings= await Booking.find({hotel:hotel_id}).populate("room hotel user").sort({created:-1});
        //total booking 
        const totalBookings=bookings.length;
        //total revenue
        const totalRevenue= bookings.reduce((acc, booking)=> acc + booking.totalPrice, 0);
        res.json({success:true, dashboardData:{totalBookings, totalRevenue,bookings}});
    } catch (error) {
        res.json({success:false, message:"Failed to fetch Booking"});
    }
}
