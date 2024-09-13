import axios from "axios"
import { useEffect, useState } from "react"
import {GetUserId} from '../hooks/GetUserId'

function Home() {
  const userid=GetUserId()
  
  let[recipe,setrecipe]=useState();
  let[savedrecipe,setsavedrecipe]=useState();
  useEffect(()=>{
    const userid=GetUserId()
    
    const fetchrecipe=async()=>{
    try {
        const response= await axios.get("http://localhost:3001/recipe")
        setrecipe(response.data)
    } catch (error) {
      console.log(error)
    };
    }
    const fetchsavedrecipe=async()=>{
      const response=await axios.get(`http://localhost:3001/recipe/savedrecipe/${userid}`)
      setsavedrecipe(response.data.savedRecipes)
    }
    fetchrecipe()
    fetchsavedrecipe()

  },[])

  const saveRecipe=async(id)=>{
    try {
      const response = await axios.put('http://localhost:3001/recipe',{id,userid})
      setsavedrecipe(response.data.savedRecipes)
    } catch (error) {
      console.log(error)
    }
}

const isRecipeSaved=(id)=>savedrecipe?.includes(id)
  


  return (
    <>
    <h1>Home</h1>
    <div>
      <ul>
        {recipe?.map((e,index)=>(
          <li key={index}>
          <div><h2>{e.name}</h2></div>
          <div><button disabled={isRecipeSaved(e._id)} onClick={()=>saveRecipe(e._id)}>
            
            {isRecipeSaved(e._id) ? "saved" : "save"}</button></div>
          <p><h3>{e.ingredients}</h3></p>
          <div><img src={e.imageurl} alt={e.name}/></div>
          <div>Cooking time {e.cookingTime}(minutes)</div>
          </li>
        ))} 
        </ul>
    </div>
    </>
  )
}

export default Home
