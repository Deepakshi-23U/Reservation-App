import mongoose from "mongoose";
const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    roomNumbers: [{ number: Number, unavailableDates: {type: [Date]}}],
  },
  { timestamps: true }
);

/*
{
  "title":"single economy",
  "price": 100,
  "capacity": 1,
  "desc": "1 bedroom | 1 bathroom",
  "roomNumbers" : [{"number":101}, {"number":102}]
}
 */
const Rooms = mongoose.model("Rooms", RoomSchema);
export default Rooms;