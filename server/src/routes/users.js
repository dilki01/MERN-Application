import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/Users.js';

const router = express.Router();

//register endpoint
router.post("/register",async (req,res)=>{
    const {username , password} = req.body;
    const user = await UserModel.findOne({username});
    // res.json(user);
    if(user){
        res.json({message: "User already exists"});
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new UserModel({username, password: hashedPassword});
    await newUser.save();
    res.json({message: "User registered successfully"});
});

//login endpoint
router.post("/login", async(req,res)=>{
    const {username, password} = req.body;
    const user = await UserModel.findOne({username});

    if(!user){
        res.json({message: "User not found"});
    }
    else{
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            res.json({message: "username or password is incorrect"});
        }
        else{
        const token = jwt.sign({id: user._id}, "secret");
        res.json({token,userID: user._id});
        }
}
}); //when login need to create a web token




export{router as userRouter};

export const verifyToken = (req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        jwt.verify(token,"secret",(err)=>{
            if(err) return res.sendStatus(403);
            next();
        });
    }
    else{
        res.sendStatus(401);
    }
}