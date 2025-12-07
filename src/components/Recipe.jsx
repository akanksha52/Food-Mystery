import { useEffect, useState } from "react";

export default function Recipe({ ingredientsList }) {
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getRecipe() {
      const prompt = `Give me a simple recipe using these ingredients: ${ingredientsList.join(", ")}`;

      const res = await fetch(
        "https://api-inference.huggingface.co/models/google/flan-t5-base",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_HF_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: prompt,
          }),
        }
      );

      const data = await res.json();
      setRecipe(data[0]?.generated_text || "No recipe found");
      setLoading(false);
    }

    getRecipe();
  }, [ingredientsList]);

  return (
    <div className="recipe-box">
      <h2>Recipe ✨</h2>

      {loading ? <p>Loading recipe...</p> : <p>{recipe}</p>}
    </div>
  );
}
