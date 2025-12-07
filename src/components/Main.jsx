import { useState } from "react";
import Ing from "./IngForm";
import Recipe from "./Recipe";

export default function Main() {
  const [ingredient, setIngredient]=useState("");
  const [ingredientsList, setIngredientsList]=useState([]);

  const [recipeUI, setRecipeUI] = useState(null);

  function GetRecipe() {
    setRecipeUI(<h1>DDDDDDD</h1>);
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

      <Recipe 
        ingredientsList={ingredientsList} 
        get={GetRecipe} 
      />
      
      {recipeUI}
    </div>
  );
}
