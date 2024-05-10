import jwt from "jsonwebtoken";
import { AppError } from "./error.js"
import dotenv from "dotenv"
dotenv.config();

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return next(AppError(403,"Token not found"));
    }
    if(token)
    {
        try {
            const data = jwt.verify(token, process.env.SECRET);
            req.user = data;
            return next();
          } catch {
            return next(AppError(404, "Token is wrong"))
          }
    }
    
  };


export const verifyUser = (req,res,next)=>{
   
    verifyToken(req,res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }
        else{
            if(err) return next(AppError(404,"Not authorised"));
        }
    })
}

export const verifyAdmin  = (req,res,next)=>{
    verifyToken(req,res, ()=>{
        if(req.user.isAdmin){
            next();
        }
        else{
            if(err) return next(AppError(404,"Not authorised"));
        }
    })
}