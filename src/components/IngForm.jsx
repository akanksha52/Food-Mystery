import { useState } from "react";

export default function Ing(props) 
{
  
    return (
      <main>
        <div className="content-card">
          <form className="ingredient-form" onSubmit={props.add}>
            <input
              type="text"
              placeholder="eg. Pepper"
              value={props.ingredient}
              onChange={(e) => props.setIngredient(() => e.target.value)}
              className="ingredient-input"
              name="ingredient"
            />
            <button type="submit" className="add-btn">
              ADD
            </button>
          </form>
        </div>
      </main>
    );
  }