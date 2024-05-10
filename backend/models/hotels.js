import mongoose from 'mongoose';
const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  cancellation : {
    type: String,
    required: true
  },
  pets:{
    type : String,
    required : true
  },
  review:{
    type: String
  },
  photos: {
    type: [String],
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  rooms: {
    //this takes id of all the rooms
    type: [String],
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

const Hotels =  mongoose.model("Hotels", HotelSchema);
export default Hotels;