import { useState } from "react";
import Ing from "./IngForm";
import List from "./List";
import Recipe from './Recipe'

export default function Main() {
  const [ingredient, setIngredient]=useState("");
  const [ingredientsList, setIngredientsList]=useState([]);
  const [showRecipe, setShowRecipe]=useState(false);

  const [recipeUI, setRecipeUI] = useState(null);

  function GetRecipe() {
    setShowRecipe((prev) => !prev)
  }

  function AddIngredients(event) {
    event.preventDefault();
    const formData=new FormData(event.currentTarget);
    const newIngredient=formData.get("ingredient").trim().toLowerCase();
    if(!newIngredient) return;
    if(ingredientsList.includes(newIngredient)) {
      setIngredient("");
      return;
    }
    setIngredientsList((prev) => [...prev, newIngredient]);
    setIngredient("");
  }

  return (
    <div className="main-container">
      <Ing
        ingredient={ingredient}
        setIngredient={setIngredient}
        ingredientsList={ingredientsList}
        add={AddIngredients}
      />

      <List 
        ingredientsList={ingredientsList} 
        get={GetRecipe} 
      />
      
      {showRecipe && (<Recipe ingredientsList={ingredientsList} />)}
    </div>
  );
}


