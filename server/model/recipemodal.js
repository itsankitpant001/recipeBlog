const mongoose=require('mongoose')
const recipeSchma=new mongoose.Schema({
   name:{type:String,required:true,},
   ingredients:[{type:String,required:true}],
   imageurl:{type:String,required:true},
   cookingTime:{type:String,required:true},
   UserOwner:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}



})
const recipemodal=mongoose.model("recipes",recipeSchma)
module.exports=recipemodal;