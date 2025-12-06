import { useState } from "react";
import Ingredients from './Ingredients'


export default function Main() {
  const [ingredientsList, setIngredientsList]=useState([]);
  const [ingredient, setIngredient]=useState("");
  function HandleSubmit(event)
  {
    event.preventDefault();
    const formData=new FormData(event.currentTarget);
    const newIngredient=formData.get("ingredient").trim().toLowerCase();
    if (!newIngredient) return; 
    if (ingredientsList.includes(newIngredient)) 
    {
      setIngredient("");
      return;
    }
    setIngredientsList(prev => [...prev, newIngredient]);
    setIngredient("");
  }

  function GetRecipe()
  {
    console.log("Recipe");
  }

  const InElements=ingredientsList.map((ing) => {
    return <Ingredients key={ing} name={ing}/>
  });

  return (
    <div className="main-container">

      <div className="content-card">
        <form className="ingredient-form" onSubmit={HandleSubmit}>
          <input
            type="text"
            placeholder="eg. Pepper"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            className="ingredient-input"
            aria-label="Add ingredient"
            name="ingredient"
          />
          <button type="submit" className="add-btn">
            ADD
          </button>
        </form>
        
        {ingredientsList.length>0 && 
          <div className="main-ign-container">
            <h1>Ingredients in hand: </h1>
            <ul className="ign-list">
              {InElements}
            </ul>
            {ingredientsList.length>4 &&            
              <div className="recipe-box">
                <h2 className="recipe-title">Ready for a Recipe?</h2>
                <p className="recipe-subtext">
                  Generate a delicious recipe using your list of ingredients.
                </p>
                <button className="recipe-btn" onClick={GetRecipe}>
                  Get a Recipe →
                </button>
              </div>
            }
          </div>
        }


      </div>
    </div>
  );
}