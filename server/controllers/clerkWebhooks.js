import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    //GETTING HEADERS
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };
    //VERIFYING HEADERS
    await whook.verify(JSON.stringify(req.body), headers);

    const { data, type } = req.body;
    // console.log("ckecking type: ", type);
    

     const userData = {
          _id: data.id,
          username: data.first_name + " " + data.last_name,
          email: data.email_addresses[0].email_address,
          image: data.image_url,
          // role: "user",
          // recentSearchedCities: [],
        };

    console.log("logging userdata",userData); //checking data coming from

    switch (type) {
      case "user.created": {
      //   const userData = {
      //     _id: data.id,
      //     username: data.first_name + " " + data.last_name,
      //     email: data.email_addresses[0].email_address,
      //     image: data.image_url,
      //     // role: "user",
      //     // recentSearchedCities: [],
      //   };
        await User.create(userData);
        break;
      }

      case "user.updated": {
        // const userData = {
        //   _id: data.id,
        //   username: data.first_name + " " + data.last_name,
        //   email: data.email_addresses[0].email_address,
        //   image: data.image_url,
        //   // role: "user",
        //   // recentSearchedCities: [],
        // };

        await User.findByIdAndUpdate(data.id, userData);
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        break;
      }

      default:
        break;
    }
    res.json({ success: true, message: "Webhook Received" });
  } catch (error) {
    console.log("catch block r=erooro",error.message);
    res.json({ success: false, message: error.message });
  }
};

export default clerkWebhooks;
