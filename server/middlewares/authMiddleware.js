import User from "../models/User.js";

//MIDDLEWARE TO CHECK USER AUTHENTICATION

export const protect= async(req,res,next)=>{

    const {userId}= req.auth();
    // console.log("req.auth() output:", req.auth());

    // console.log(userId);
    
    if(!userId){
        res.json({success:false, message: "Not Authorized"});
    }
    else{
        const user =await User.findById(userId);
        // console.log("userfind", user);
        
        req.user=user;
        next();
    }

}
