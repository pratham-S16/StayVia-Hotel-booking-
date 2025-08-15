import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

const registerHotel = async (req, res) => {
    
    try {

        const { name,address, contact, city } = req.body;
        // console.log("req.user:", req.user);
        const owner= req.user._id; //req.user_id
        
        const hotel=await Hotel.findOne({owner});
    if(hotel){
        return res.json({ success: false, message: "You have already registered a hotel" });
    }
        await Hotel.create({
            name,
            address,
            contact,
            city,
            owner
        });
        await User.findByIdAndUpdate(owner, { role: "hotelOwner" });
        res.json({ success: true, message: "Hotel registered successfully" });
    
    } catch (error) {
        // console.log(error.message);
        return res.json({ success: false, message: error.message });
        
    }

   
}
export default registerHotel;