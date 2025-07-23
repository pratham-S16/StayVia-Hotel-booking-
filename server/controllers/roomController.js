import { json } from "express";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

//API TO CREATE NEW ROOM FOR A HOTEL
export const createRoom= async(req,res)=>{
try {
    const {roomType, priceperNight, amenities}=req.body;
    const hotel= Hotel.findOne({owner: req.auth.userId});

    if(!hotel)  return res.json({success:false, message: "No Hotel found "})
    // upload images in cloudinary 
    const uploadImages=req.files.map(async(file)=>{
      const response=  await cloudinary.uploader.upload(file.path);
      return response.secure_url;
    });

    //wait for all images to be uploaded
    const images= await Promise.all(uploadImages);

    await Room.create({
        hotel: hotel._id,
        roomType,
        pricePerNight: +priceperNight,
        amenities: JSON.parse(amenities),
        images,  

    })

    res.json({success:true, message: "Room created successfully"});
} catch (error) {
    res.json({success:false, message: error.message});
}
}

//API TO GET ALL ROOMS
export const getRooms= async(req,res)=>{
    try {
        const room= await Room.find({isAvailable: true}).populate({
            path: "hotel",
            populate: {
                path: "owner",
                select: "image"
            }
        }).sort({createdAt: -1});
        res.json({success:true, rooms: room});
    } catch (error) {
        res.json({success:false, message: error.message});
        
    }

}

//API TO GET ALL ROOM OF SPECIFIC HOTEL
export const getOwnerRoom= async(req,res)=>{
    try {
        const hotel= await Hotel.findOne({owner: req.auth.userId});
        if(!hotel) return res.json({success:false, message: "No Hotel found"});

        const rooms= await Room.find({hotel: hotel._id.toString}).populate("hotel");
        res.json({success:true, rooms});
        
    } catch (error) {
        res.json({success:false, message: error.message});
        
    }
}

//API TO TOGGLE AVAILABILITY OF ROOM
export const toggleRoomAvailability= async(req,res)=>{

    try {
        const {roomId}=req.body;
        const roomData= await Room.findById(roomId);
        roomData.isAvailable= !roomData.isAvailable;
        await roomData.save();
        res.json({success:true, message: "Room availability toggled successfully"});
    } catch (error) {
        res.json({success:false, message: error.message});
        
    }

}