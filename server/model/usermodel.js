const mongoose=require('mongoose')
const UserSchema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    savedRecipes:[{type:mongoose.Schema.Types.ObjectId,required:true,ref:"recipe"}]
})
const usermodel=mongoose.model("user",UserSchema)
module.exports =usermodel