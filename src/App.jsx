import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

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
        "http://host.docker.internal:5000/api/suggest",
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
      <h1 className="text-center mb-4">🎬 AI Movie Genius</h1>

      {/* Prompt Input */}
      <div className="row justify-content-center mb-3">
        <div className="col-md-12">
         
            <input
              className="form-control shadow-lg"
              placeholder="Enter a movie or description..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
             
            />
         
        </div>
      </div>

      {/* Submit Button */}
      <div className="row justify-content-center">
        <div className="col-auto">
          <button
            className="btn btn-primary shadow-lg"
            onClick={getSuggestions}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Thinking...
              </>
            ) : (
              "🎥 Get AI Movie Suggestions"
            )}
          </button>
        </div>
      </div>

      {/* Output */}
      {result && (
        <div className="row justify-content-center mt-4">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header bg-dark text-white">
                🍿 Suggested Movies from AI
              </div>
              <div className="card-body">
                <pre className="card-text" style={{ whiteSpace: "pre-wrap" }}>
                  {result}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
