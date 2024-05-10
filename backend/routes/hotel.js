import express from 'express'
const router = express.Router();
import Hotels from '../models/hotels.js'
import Rooms from '../models/rooms.js'
import { AppError } from '../utils/error.js';

/*
 {
  "name": "terrance", 
  "type" : "Resort" 
  "city": "Bombay", 
  "address": "cp", 
  "desc": "good service", 
  "cheapestPrice": 500
 }
 */

//creating hotels
router.post('/', async (req,res,next)=>{
    
    try{
        const newhotel = new Hotels(req.body);
        await newhotel.save();
        res.status(200).json(newhotel).cookie("hotelcookie","hello")
    }
    catch (e)
    {
        next(AppError(400,"There is an error in creating hotel"));
    }
    
})


//viewing hotels on basis of query : user
router.get('/', async (req,res,next)=>{
  console.log("query",req.query);
    const { min, max } = req.query;
    const destination = req.query.city;
    const type = req.query.type;
    const query = {};

    if(destination!=="all")
    {
       query.city = destination;
    }

    if(type!=="all")
    {
       query.type = type;
    }

    try {
    const hotels = await Hotels.find({...query, cheapestPrice: { $gte: min | 1, $lte: max || 999 }}).limit(req.query.limit);
    res.status(200).json(hotels);
    }
    catch(e)
    {
        next(AppError(400,"There is an error in fetching hotels"));
    }
})

//for featured component
router.get('/countbycity', async (req,res,next)=>{
    //cities is an array
    const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotels.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
});

//for browse by property component
router.get('/countbytype', async (req,res,next)=>{
    try
    {
       const hotels = await Hotels.countDocuments({type:"Hotel"});
       const apartments = await Hotels.countDocuments({type:"Appartment"});
       const resorts = await Hotels.countDocuments({type:"Resort"});
       const villas = await Hotels.countDocuments({type:"Villa"});
       const cabins = await Hotels.countDocuments({type:"Cabin"});

       res.status(200).json([
        { type: "hotel", count: hotels},
        { type: "apartment", count: apartments },
        { type: "resort", count: resorts },
        { type: "villa", count: villas },
        { type: "cabin", count: cabins },
      ]);
    } 
    catch (err) {
        next(err);
      }
});

//for getting rooms in a hotel

router.get("/room/:id", async (req, res, next) => {
    try {
      const hotel = await Hotels.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Rooms.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  });


//viewing 1 hotel : user
router.get('/:id', async (req,res,next)=>{
    try{
    const { id } = req.params;
    const foundhotel = await Hotels.findById(id);
    res.status(200).json(foundhotel)
    }
    catch(e)
    {
        next(AppError(400,"There is an error in viewing thiss hotel"));
    }
})


export default router;

/*


//viewing all hotels : user
router.get('/viewall', async (req,res,next)=>{
    try {
    const hotels = await Hotels.find({});
    res.status(200).json(hotels);
    }
    catch(e)
    {
        next(AppError(400,"There is an error in fetching hotels"));
    }
})


//updating hotels : admin
router.get('/:id/updatehotel', verifyAdmin, async (req,res)=>{
    res.send("this is the form to update a hotel")
})


//creating hotels : admin
router.get('/addhotel', (req,res)=>{
    res.send("add form");
})


router.put('/:id', verifyAdmin, async (req,res,next)=>{
    try
    {
        const {id} = req.params;
        const updatedhotel = await Hotels.findByIdAndUpdate(id, req.body, {runValidators:true});
        res.status(200).json(updatedhotel);
        res.redirect('/'); 
    }
    catch (e){
        next(AppError(400,"There is an error in updating hotel"));
    }
    
})

//deleting hotels : admin
router.get('/:id/deletehotel', verifyAdmin, async (req,res,next)=>{
    try{
      const { id } = req.params;
      await Hotels.findByIdAndDelete(id);
      res.status(200)
    }
    catch (e)
    {
        next(AppError(400,"There is an error in deleting hotel"));
    }
    res.redirect('/');
})

 */


