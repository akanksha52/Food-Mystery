import { useState } from "react";
import Ingredients from './Ingredients'


export default function Main() {
  const [ingredientsList, setIngredientsList]=useState([]);
  const [ingredient, setIngredient]=useState("");
  function HandleSubmit(event)
  {
    event.preventDefault();
    const formData=new FormData(event.currentTarget);
    const newIngredient=formData.get("ingredient");
    setIngredientsList(prev => [...prev, newIngredient]);
    setIngredient((e) => "")
  };

  const InElements=ingredientsList.map((ing) => {
    return <Ingredients key={ing} name={ing}/>
  });

  return (
    <div className="main-container">

      <form className="ingredient-form" onSubmit={HandleSubmit} onEnter>
        <input
          type="text"
          placeholder="eg. Pepper"
          value={ingredient}
          onChange={(e) => 
            {
                console.log(e);
                setIngredient(e.target.value)
            }}
          className="ingredient-input"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>

      <hr/>

      <ul className="ign-list">
        {InElements}
      </ul>

    </div>
  );
}