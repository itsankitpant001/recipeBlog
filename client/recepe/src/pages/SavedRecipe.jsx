import { useEffect, useState } from "react"
import { GetUserId } from "../hooks/GetUserId"
import axios from 'axios'


function SavedRecipe() {
  let[recipe,setrecipe]=useState()
  useEffect(()=>{
    const userid=GetUserId();
    const GetRecipe=async()=>{
      try {
        const response=await axios.get(`http://localhost:3001/recipe/savedrecipe/id/${userid}`)
      console.log(response.data)
      setrecipe(response.data.savedrecipe)
      } catch (error) {
        console.log(error)
        
      }




      
    }
    GetRecipe()
  },[])

  return (
    <>
    <h1>Saved Recipe</h1>
    <div>
      <ul>
        {recipe?.map((e,index)=>(
          <li key={index}>
          <div><h2>{e.name}</h2></div>
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

export default SavedRecipe