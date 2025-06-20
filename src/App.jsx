import React, { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const getSuggestions = async () => {
    if (!prompt) return;

    setLoading(true);
    setResult("");

    try {
      const res = await axios.post(
        "https://ai-movie-server.onrender.com/api/suggest",
        {
          prompt,
        }
      );
      setResult(res.data.result);
    } catch (err) {
      console.error("Error:", err.message);
      setResult("❌ Failed to get suggestions from AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-3">
      <h1 className="text-center mb-3">🎬 AI Movie Genius</h1>

      <div className="mb-2">
        <input
          className="form-control shadow-lg"
          placeholder="Enter a movie name or description..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      <div className="text-center">
        <button
          className="btn btn-primary "
          onClick={getSuggestions}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Get Movie Suggestions"}
        </button>
      </div>

      {result && (
        <div className="card mt-4 shadow-lg ">
          <div className="card-body">
            <h5 className="card-title">🍿 Suggested Movies</h5>
            <pre className="card-text" style={{ whiteSpace: "pre-wrap" }}>
              {result}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
