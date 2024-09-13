const express =require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter=require('./routes/userroute')
const recepeRouter=require('./routes/reciperoute')


const app=express();


app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/Recipe')

app.listen(3001,()=>console.log("server is started")
)
app.use("/auth",userRouter)
app.use('/recipe',recepeRouter)