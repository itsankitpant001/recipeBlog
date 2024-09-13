const express=require('express')
const jwt = require('jsonwebtoken')
const bcrypt =require('bcrypt')
const usermodel=require('../model/usermodel')

const router=express.Router();

router.post('/register',async (req,res)=>{
    const {username,password}=req.body
    const user= await usermodel.findOne({username})
    if(user){
        res.json({message:"User Already Exists"})
    }
    else{
        const hashedpass=await bcrypt.hash(password,10)
        const newuser=new usermodel({username,password:hashedpass})
        await newuser.save();
        res.json({message:"New User Added"})
    }
})
router.post('/login' ,async (req,res)=>{
    const {username,password}=req.body
    const response=await usermodel.findOne({username})
    if(!response){
        return res.json({message:"User not available"})
    }
   
        const PasswordIsvalid= await bcrypt.compare(password,response.password)
    
    if(!PasswordIsvalid){
        return res.json({message:"username or password is not valid"})
    }
      const token = jwt.sign({id:response._id},"secret");
      return res.json({token,id:response._id})
})

module.exports=router;

// const verifyToken=(req,res,next)=>{
//     const token=req.headers.auth0rization 
//     if(token){
//         jwt.verify(token,"secret", (err=>{
//            if(err) return res.sendStatus(403);
//            next()
//         }));
//     }
//         else{
//             res.sendStatus(401)
//         }
// }
// module.exports=verifyToken;