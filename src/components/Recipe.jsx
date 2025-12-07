import { useEffect, useState } from "react";

export default function Recipe({ ingredientsList }) {
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function getRecipe() {
    try {
      setLoading(true);
      setError("");

      const prompt = `
Create a detailed cooking recipe using these ingredients: ${ingredientsList.join(", ")}.

Return the recipe in clean MARKDOWN format with:
- A title at the top
- ## Ingredients
- ## Instructions (numbered steps)
- ## Tips (optional)

Do NOT use HTML. Use only Markdown.
`;

      const res = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_KEY}`,
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: 600,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error?.message || "Failed to generate recipe.");
        setLoading(false);
        return;
      }

      const text = data?.choices?.[0]?.message?.content || "";
      setRecipe(text);
      setLoading(false);
    } catch (err) {
      setError("Network error while generating recipe.");
      setLoading(false);
    }
  }

  useEffect(() => {
    if (ingredientsList.length > 0) {
      getRecipe();
    }
  }, [ingredientsList]);

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
              // ✅ Markdown → HTML conversion
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

      {!loading && ingredientsList.length > 0 && (
        <button className="api-recipe-btn" onClick={getRecipe}>
          🔄 Regenerate Recipe
        </button>
      )}
    </div>
  );
}
