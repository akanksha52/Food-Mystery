import { useState } from "react";

export default function Main() {
  const [ingredient, setIngredient] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (ingredient.trim() === "") return;

    console.log("Added ingredient:", ingredient);
    setIngredient("");
  }

  return (
    <div className="main-container">
      <form className="ingredient-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter an ingredient..."
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          className="ingredient-input"
        />

        <button type="submit" className="add-btn">
          Add Ingredient
        </button>
      </form>
    </div>
  );
}
