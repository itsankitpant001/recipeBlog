import  { useState } from "react";
import axios from "axios";
import { GetUserId } from "../hooks/GetUserId";
import {useNavigate} from "react-router-dom"
function CreateRecipe() {
  const userid=GetUserId();
  const [formData, setFormData] = useState({
    name: "",
    ingredients: "",
    imageurl: "",
    cookingTime: "",
    UserOwner:userid
  });
  const navigate=useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/recipe',formData)
    alert('recipe created')
    navigate('/')

    } catch (error) {
      console.log(error)
    }
    // You can add the form submission logic here (like sending it to an API)
  };
  

  return (
    <div className="create-recipe">
      <h2>Recipe Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <label htmlFor="name">Recipe Name:</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br /><br />

        {/* Ingredients Field */}
        <label htmlFor="ingredients">Ingredients:</label>
        <br />
        <textarea
          id="ingredients"
          name="ingredients"
          rows="4"
          cols="50"
          value={formData.ingredients}
          onChange={handleChange}
          required
        />
        <br /><br />

        {/* Image URL Field */}
        <label htmlFor="imageurl">Image URL:</label>
        <br />
        <input
          type="url"
          id="imageurl"
          name="imageurl"
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />
        
        <br /><br />

        {/* Cooking Time Field */}
        <label htmlFor="cookingTime">Cooking Time (in minutes):</label>
        <br />
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={formData.cookingTime}
          onChange={handleChange}
          required
        />
        <br /><br />

        {/* Submit Button */}
        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  );
}

export default CreateRecipe;
