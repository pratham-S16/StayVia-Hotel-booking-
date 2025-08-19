import Booking from "../models/Booking.js"
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js"
import transporter from "../config/nodemailer.js"
import stripe from 'stripe';

//function to check avaailability of room
const checkRoomAvailability = async ({checkInDate, checkOutDate,room}) => {
    try {
        const bookings= await Booking.find({
            room,
            checkInDate: {$lte: checkOutDate},
            checkOutDate: {$gte: checkInDate},
        })
        const isAvailable = bookings.length === 0;
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

        const booking= await Booking.create({
            user,
            room,
            hotel: roomData.hotel._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice: +totalPrice,
        })
        // console.log("Booking created successfully", booking);
        // console.log(booking._id);
        
        
        

        const mailOptions={
            from: process.env.SENDER_EMAIL,
            to: req.user.email,
            subject: "Hotel Booking Details",
            html: `
                <h2>Booking Details</h2>
                <p> Dear ${req.user.username}
                <p>Thank you for booking with us! Here are your details: </p>
               <ul>
                    <li><strong>Booking ID:</strong> ${booking._id}</li>
                    <li><strong>Hotel Name:</strong> ${roomData.hotel.name}</li>
                    <li><strong>Location:</strong> ${roomData.hotel.address}</li>

                    <li><strong>Date:</strong> ${booking.checkInDate.toDateString()}</li>
                    
                    <li><strong>Booking Amount:</strong>${process.env.CURRENCY || 'INR'} ${booking.totalPrice}/night </li>
                </ul>
                <p>We look forward to welcoming you!</p>
                <p>Best Regards,</p>
            `
        }
        await transporter.sendMail(mailOptions)
        res.json({success:true, message: "Room Successfully Booked"});


    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    
    }
}

//API TO GET ALL BOOKING OF PARTICULAR USER
// GET /api/bookings/user

export const getUserBookings= async(req,res)=>{
    try {
     const user=req.user._id;
    //  console.log("user id", user);
     
     const bookings=await Booking.find({user}).populate("room").populate("hotel").sort({createdAt:-1})
      res.json({success:true, bookings});

    } catch (error) {
     res.json({success:false, message: error.message});

}
}

export const getHotelBookings= async(req,res)=>{
    try {
        const hotel=await Hotel.findOne({owner:req.user._id});
        // console.log("Hotel ID:", hotel);
        
        if(!hotel)
        {
            res.json({success:false, message:"Hotel Not found"});
        }
        const bookings= await Booking.find({hotel:hotel._id}).populate("room hotel user").sort({created:-1});
        //total booking 
        const totalBookings=bookings.length;
        //total revenue
        const totalRevenue= bookings.reduce((acc, booking)=> acc + booking.totalPrice, 0);
        res.json({success:true, dashboardData:{totalBookings, totalRevenue,bookings}});
    } catch (error) {
        res.json({success:false, message:"Failed to fetch Booking"});
    }
}

export const stripePayment= async(req,res)=>{
try {
    const {bookingId}= req.body;
    const booking= await Booking.findById(bookingId);
    const roomData = await Room.findById(booking.room).populate("hotel");
    const totalPrice = booking.totalPrice;
    const {origin} =req.headers;
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const line_items = [
        {
            price_data: {
                currency: process.env.CURRENCY || 'INR',
                product_data: {
                    name: roomData.hotel.name,
                    // description: `Booking for ${roomData.hotel.name} from ${booking.checkInDate} to ${booking.checkOutDate}`,
                },
                unit_amount: totalPrice * 100, // Convert to cents
            },
            quantity: 1,
        }
    ]
    // Create a checkout session
    const session = await stripeInstance.checkout.sessions.create({
        line_items,
        mode: 'payment',
        success_url: `${origin}/loader/my-bookings`,
        cancel_url: `${origin}/my-bookings`,
        metadata: {
            bookingId,
        }
    })
    res.json({success: true, url: session.url});

} catch (error) {
    res.json({success: false, message: "Payment failed"});
}

}
