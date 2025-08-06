import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";
import { createRoom, getOwnerRoom, getRooms, toggleRoomAvailability } from "../controllers/roomController.js";


const roomRouter= express.Router();

roomRouter.post("/", upload.array("images", 4), protect, createRoom);
roomRouter.get("/getroom", getRooms);
roomRouter.get("/owner", getOwnerRoom);
roomRouter.post("/toggle-availability", toggleRoomAvailability);

export default roomRouter;


