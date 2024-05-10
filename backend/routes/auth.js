import express from "express";
import bcrypt from "bcryptjs"
import Users from "../models/users.js"
import { AppError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();

const router = express.Router();

router.post('/register', async (req,res,next)=>{
    try
    {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt);
        
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;

        const exists = await Users.findOne({email});

        //validation
        if(exists) return next(AppError(400,"Email already exists"));

        //if one field is missing
        if(!username || !email || !password) return next(AppError(404,"Field missing"));

        //password not strong
        //if(!validator.isStrongPassword(password)) return next(AppError(400,"Password is not strong"));

        const newuser = new Users({
        username: req.body.username,
        email: req.body.email,
        password:hash,
        isAdmin: req.body.isAdmin,
        country: req.body.country,
        city: req.body.city,
        phone: req.body.phone
       })
  
       await newuser.save();
       res.status(200).send("user has been created!");
    }
    catch(e)
    {
       next(e);
    }
})

router.post('/login', async (req,res,next)=>{
    try
    {
        const username = req.body.username;
        const password = req.body.password;
       
        if(!username || !password) return next(AppError(400,"Field missing"));

        const user = await Users.findOne({username:req.body.username})
        if(!user) return next(AppError(404,"User not found"));

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password)
        if(!isPasswordCorrect) return next(AppError(400,"Username or password incorrect"))
        
        //if password is correct, for each login a token will be given to the user to keep him authenticated
        
      const token = jwt.sign({username:user.username,isAdmin:user.isAdmin}, process.env.SECRET,{expiresIn:'15m'});

      res.cookie("access_token", token, {httpOnly:true, path:"/"}).status(200)
      .json({username:user.username, id:user._id, isAdmin:user.isAdmin});

  } 
  catch (err) {
    next(err);
  }
    
})

export default router;