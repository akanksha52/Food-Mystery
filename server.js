import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/recipe", async (req, res) => {
  try {
    const { prompt } = req.body;

    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 600,
        }),
      }
    );

    const data = await groqRes.json();
    res.json(data);
  } catch (err) {
    console.error("Backend Error:", err);
    res.status(500).json({ error: "Groq request failed" });
  }
});

app.listen(5000, () => console.log("✅ Backend running on port 5000"));
