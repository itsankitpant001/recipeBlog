const express=require('express')
const app=express();
const recipeModel=require('../model/recipemodal');
const usermodel = require('../model/usermodel');

const router=express.Router();

router.get('/' ,async (req,res)=>{
   try {
    const response=await recipeModel.find();
    res.json(response)
   } catch (error) {
    res.json({error})
   }

})
router.post('/',async(req,res)=>{
   try {
    const recipe=req.body
    const response=new recipeModel(recipe);
     await response.save();
     res.json({response})
   } catch (error) {
    console.error(error)
   }
})
router.put('/',async (req,res)=>{
   try {
      const recipe=await recipeModel.findById(req.body.id)
   const user=await usermodel.findById(req.body.userid)
   user.savedRecipes.push(recipe);
   await user.save()
   res.json({savedRecipes:user.savedRecipes})
   } catch (error) {
      console.log(error) 
   }
})
router.get("/savedrecipe/:userid",async(req,res)=>{
   try {
      const user=await usermodel.findById(req.params.userid)
   res.json({savedRecipes:user?.savedRecipes})
   } catch (error) {
      console.log(error)
   }
})
router.get("/savedrecipe/id/:userid",async(req,res)=>{
   try {
      const user=await usermodel.findById(req.params.userid)
      const savedrecipe=await recipeModel.find({_id:{$in:user.savedRecipes}})
   res.json({savedrecipe})
   } catch (error) {
      console.log(error)
   }
})

module.exports=router