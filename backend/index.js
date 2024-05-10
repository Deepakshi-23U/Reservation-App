import express from 'express';
const app = express();
import path from 'path';
import methodOverride from 'method-override';
import mongoose from 'mongoose'
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

//axios works with cors
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

//importing routes
import hotelroutes from './routes/hotel.js'
import authroutes from './routes/auth.js'
import useroutes from './routes/user.js'
import roomroutes from './routes/room.js'

//checking connection
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Mongoose connection open")
})
.catch(err=>{
    console.log("Oh no mongo error!", err)
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("Database Connected");
});


//checking if server is up
app.listen(process.env.PORT, ()=>{
    console.log("App is listening")
})

//setting express
const __dirname = path.resolve();
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}))      //parse data recieved by server from get request if the data is from form.                         //parse data recieved by server from get request if the data is json.
app.set('view engine','ejs')                     //to use ejs since we will be responding to the requests with html
app.use(methodOverride('_method'));

app.use('/u', useroutes);
app.use('/room', roomroutes);
app.use('/hotel', hotelroutes);
app.use('/auth', authroutes);


//error handler
app.use((err,req,res,next)=>{
    const { status = 100, message = 'An error!'} = err;
    return res.status(status).json(message)
})
