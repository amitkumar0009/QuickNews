import React, { useEffect, useState } from "react";
import { apikey } from "../config/Apikey";
function Search({ searchquery}) {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [currentText, setCurrentText] = useState("");
  const [speakingIndex, setSpeakingIndex] = useState(null);

  // Speak function
  const speakText = (text, index = null) => {
    window.speechSynthesis.cancel();
    setCurrentText(text);
    setSpeakingIndex(index);

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";

    speech.onend = () => {
      setCurrentText("");
      setSpeakingIndex(null);
    };

    window.speechSynthesis.speak(speech);
  };

  // Stop function
  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setCurrentText("");
    setSpeakingIndex(null);
  };

  // Read all headlines
  const readAllHeadlines = (articlesToRead = articles) => {
    window.speechSynthesis.cancel();
    articlesToRead.forEach((article, index) => {
      const text = `${index + 1}. ${article.title}`;
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = "en-US";

      speech.onstart = () => {
        setCurrentText(text);
        setSpeakingIndex(index);
      };

      speech.onend = () => {
        setCurrentText("");
        setSpeakingIndex(null);
      };

      window.speechSynthesis.speak(speech);
    });
  };

  // ✅ Fetch data & auto read on load
  useEffect(() => {
    
        const url= `https://gnews.io/api/v4/search?q=${searchquery}&apikey=${apikey}`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.articles) {
          setArticles(data.articles);

        // First say greeting
        speakText(`Here are news results for your search: ${query}`, null, null);

        // Delay reading headlines slightly to let greeting finish
        setTimeout(() => {
          readAllHeadlines(data.articles);
        }, 4000); // 1 second delay
        } else {
          setError("No articles found. Check API key or quota.");
        }
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setError("Failed to fetch articles.");
      });
  }, [searchquery]);























  

  return (
    <div className="bg-gray-100 min-h-screen text-gray-900 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Search For :  {searchquery}</h1>

      {/* Global control buttons */}
<div className="flex justify-center gap-4 mb-6">
  <button
    className="bg-green-500 text-white px-4 py-2 rounded-md"
    onClick={() => readAllHeadlines()}
    disabled={articles.length === 0}
  >
    📢 Read All Headlines
  </button>

  <button
    className="bg-yellow-500 text-white px-4 py-2 rounded-md"
    onClick={() => window.speechSynthesis.pause()}
  >
    ⏸ Pause
  </button>

  <button
    className="bg-blue-500 text-white px-4 py-2 rounded-md"
    onClick={() => window.speechSynthesis.resume()}
  >
    ▶ Resume
  </button>

  <button
    className="bg-red-500 text-white px-4 py-2 rounded-md"
    onClick={stopSpeaking}
  >
    ⏹ Stop
  </button>
</div>


      {/* Show currently reading text */}
      {currentText && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6 rounded-md">
          <h3 className="font-semibold text-yellow-800">🔊 Reading:</h3>
          <p className="text-gray-700">{currentText}</p>
        </div>
      )}

      {/* Show errors or articles */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {articles.length > 0 ? (
        <ul className="space-y-4 max-w-3xl mx-auto">
          {articles.map((article, index) => (
            <li
              key={index}
              className={`p-4 rounded-md shadow-md border ${
                speakingIndex === index
                  ? "border-yellow-500 bg-yellow-50"
                  : "bg-white"
              }`}
            >
              <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded-md"
                onClick={() =>
                  speakText(`${article.content || ""}`, index)
                }
              >
                📖 Read Description
              </button>
            </li>
          ))}
        </ul>
      ) : !error ? (
        <p className="text-center">⏳ Loading news...</p>
      ) : null}
    </div>
  );
}

export default Search;
