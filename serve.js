const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

// ========== PROXY IA GEMINI (GRATUIT) ==========
app.post("/api/chat", async (req, res) => {
  const { messages, system } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "Clé API Gemini manquante sur le serveur." });
  }

  // Convertir historique (Claude format) -> Gemini format
  const geminiContents = messages.map(m => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }]
  }));

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: system }] },
        contents: geminiContents,
        generationConfig: { maxOutputTokens: 1000, temperature: 0.7 }
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error("Erreur Gemini:", data.error);
      return res.status(500).json({ error: data.error.message });
    }

    // Reformater en format compatible (même structure que Claude)
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    res.json({ content: [{ text }] });

  } catch (err) {
    console.error("Erreur API Gemini:", err);
    res.status(500).json({ error: "Erreur lors de l'appel à l'API Gemini." });
  }
});
// ========== FIN PROXY ==========

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
