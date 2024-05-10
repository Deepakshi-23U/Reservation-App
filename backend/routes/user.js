import express from "express";
import Users from "../models/users.js"
const router = express.Router();
import { verifyToken } from "../utils/verifytoken.js";

router.get("/", async (req, res, next) => {
    try {
      const users = await Users.find();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }}
  )

router.get("/c", verifyToken, (req,res)=>{
    res.status(200).json(req.user.username);
})

router.get("/logout", verifyToken, (req,res)=>{
    return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out"})
})
  
export default router;

/*router.get('/checkauth', verifyToken, (req,res,next)=>
{
    res.status(200).json(req.user.name);
})

router.get('/checkuser/:id', verifyUser, (req,res,next)=>
{
    res.send("Hello user, you are logged in and can delete your account");
})

router.get('/checkadmin/:id', verifyAdmin, (req,res,next)=>{
    res.send("Hello admin, you are logged in and can manage accounts");
})


//updating users : user

router.get('/:id/updateuser', verifyUser, async (req,res)=>{
    res.send("this is the form to update a user")
})

router.put('/:id', async (req,res,next)=>{
    try
    {
        const {id} = req.params;
        const updateduser = await Users.findByIdAndUpdate(id, req.body, {runValidators:true});
        res.status(200).json(updateduser);
        res.redirect('/'); 
    }
    catch (e){
        next(AppError(400,"There is an error in updating user"));
    }
    
})

//deleting user : user
router.get('/:id/deleteuser',verifyUser, async (req,res,next)=>{
    try{
      const { id } = req.params;
      await Users.findByIdAndDelete(id);
      res.status(200)
    }
    catch (e)
    {
        next(AppError(400,"There is an error in deleting user"));
    }
    res.redirect('/');
})

//viewing all users : admin
router.get('/', verifyAdmin, async (req,res,next)=>{
    try{
        const users = await Users.find();
        console.log(users);
    }
    catch(e)
    {
        next(AppError(400,"There is an error in fetching users"));
    }
    
    res.send("these are all the users");
})

//viewing 1 user : user
router.get('/:id', verifyUser, async (req,res,next)=>{
    try{
    const { id } = req.params;
    const founduser = await Users.findById(id);
    res.status(200).json(founduser)
    }
    catch(e)
    {
        next(AppError(400,"There is an error in viewing thiss user"));
    }
    //res.send(`this is the found user ${id}`);
})*/
