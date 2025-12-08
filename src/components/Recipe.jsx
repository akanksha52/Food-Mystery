import { useEffect, useState } from "react";

export default function Recipe({ ingredientsList }) {
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const safeIngredients = Array.isArray(ingredientsList)
    ? ingredientsList
    : typeof ingredientsList === "string"
    ? ingredientsList.split(",")
    : [];

  async function getRecipe() {
    try {
      console.log("getRecipe() called with:", safeIngredients);

      setLoading(true);
      setError("");
      setRecipe("");

      const prompt = `
      You are an assistant that receives a list of ingredients: ${safeIngredients.join(", ")} and suggests a recipe the user could make.

      Return the recipe in clean MARKDOWN format with:
      - A title at the top
      - ## Ingredients
      - ## Instructions (numbered steps)
      - ## Tips (optional)

      Do NOT use HTML. Use only Markdown.`;

      const res = await fetch("http://localhost:5000/api/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error("Backend request failed");
      }

      const data = await res.json();
      console.log("BACKEND DATA:", data);

      let text = "";

      if (data?.choices?.[0]?.message?.content) {
        text = data.choices[0].message.content;
      } else if (data?.content) {
        text = data.content;
      } else if (typeof data === "string") {
        text = data;
      } else {
        console.warn("No recipe text found in backend response");
      }

      setRecipe(text);
      setLoading(false);
    } catch (err) {
      console.error("Frontend Error:", err);
      setError(err.message || "Network error");
      setLoading(false);
    }
  }

  useEffect(() => {
    if (safeIngredients.length > 0) {
      getRecipe();
    }
  }, [safeIngredients.join(",")]);

  return (
    <div className="api-recipe-box">
      <h2 className="api-recipe-title">Recipe 🍽️</h2>

      {loading && <p className="api-loader">🍳 Generating recipe...</p>}

      {error && <p className="api-error">{error}</p>}

      {!loading && !error && recipe && (
        <div
          className="api-recipe-content"
          dangerouslySetInnerHTML={{
            __html: recipe
              .replace(/^### (.*$)/gim, "<h3>$1</h3>")
              .replace(/^## (.*$)/gim, "<h2>$1</h2>")
              .replace(/^# (.*$)/gim, "<h1>$1</h1>")
              .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
              .replace(/^\d+\.\s+(.*)/gim, "<li>$1</li>")
              .replace(/^- (.*)/gim, "<li>$1</li>")
              .replace(/\n/gim, "<br />"),
          }}
        />
      )}

      {!loading && safeIngredients.length > 0 && (
        <button className="api-recipe-btn" onClick={getRecipe}>
          🔄 Regenerate Recipe
        </button>
      )}
    </div>
  );
}
