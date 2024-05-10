import express from "express";
import Rooms from "../models/rooms.js"
import Hotels from "../models/hotels.js"
import { AppError } from "../utils/error.js";

const router = express.Router();

//CREATE a room type(deluxe,king etc..) for a hotel and then save it in hotel
router.post("/:hotelid", async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Rooms(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
          await Hotels.findByIdAndUpdate(hotelId, {
          $push: { rooms: savedRoom._id },
      })
    } 
    catch (err) {
    next(AppError(401,"Room not saved in hotel"));
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(AppError(401,"Room not created"));
  }
});

router.get("/", async (req, res, next) => {
  try {
    const rooms = await Rooms.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }}
)

router.put("/availability/:id", async (req, res, next) => {
  try {
        //locate room that consists of id roomnumber
        const room = await Rooms.findOne({ "roomNumbers._id": req.params.id });

        //locate the id roomnumber in the roomNumbers array of the found room.
        const roomNumber = room.roomNumbers.find(rn => rn._id.toString() === req.params.id);

     const newdates = req.body.dates;
     roomNumber.unavailableDates.push(...newdates);
    console.log("room:", room);
    console.log("rn", roomNumber);
    res.status(200).json(roomNumber);
  } 
  catch (err) {
    next(err);
  }

})

export default router;

//UPDATE
/**/

//update room : admin
//router.put("/:id", verifyAdmin, updateRoom);

//DELETE :admin
//router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

//GET
//router.get("/:id", getRoom);

//GET ALL

