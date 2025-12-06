import React, { useEffect, useState } from "react";
import ConversationContainer from "./ConversationContainer";
import VisualResultCard from "./VisualResultCard";
import AIResponseCard from "./AIResponseCard";
import { apikey } from "../config/Apikey";

function Search({ searchquery }) {
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
    const url = `https://gnews.io/api/v4/search?q=${searchquery}&apikey=${apikey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.articles) {
          setArticles(data.articles);
          speakText(`Here are news results for your search: ${searchquery}`, null, null);
          setTimeout(() => {
            readAllHeadlines(data.articles);
          }, 4000);
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
    <>
      {/* Global control buttons */}
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          onClick={() => readAllHeadlines()}
          disabled={articles.length === 0}
        >
          📢 Read All
        </button>

        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors"
          onClick={() => window.speechSynthesis.pause()}
        >
          ⏸ Pause
        </button>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          onClick={() => window.speechSynthesis.resume()}
        >
          ▶️ Resume
        </button>

        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          onClick={stopSpeaking}
        >
          ⏹ Stop
        </button>
      </div>

      <ConversationContainer autoScroll={false}>
        {/* Loading state */}
        {!error && articles.length === 0 && (
          <AIResponseCard
            title="Searching..."
            content={`Looking for articles about "${searchquery}".`}
            variant="glass"
            showCopy={false}
          />
        )}

        {/* Currently reading indicator */}
        {currentText && (
          <AIResponseCard
            title="🔊 Now Reading"
            content={currentText}
            variant="border"
            showCopy={false}
          />
        )}

        {/* Error message */}
        {error && (
          <AIResponseCard
            title="Error"
            content={error}
            variant="flat"
            showCopy={false}
          />
        )}

        {/* Search results */}
        {articles.length > 0 && (
          <>
            <AIResponseCard
              title={`Search Results for "${searchquery}"`}
              content={`Found ${articles.length} articles. Click on any article to read more.`}
              variant="glass"
              showCopy={false}
            />

            <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
              {articles.map((article, index) => (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    border: speakingIndex === index ? "2px solid #fbbf24" : "none",
                    borderRadius: "16px",
                    padding: speakingIndex === index ? "0.25rem" : "0",
                    backgroundColor: speakingIndex === index ? "rgba(251, 191, 36, 0.1)" : "transparent",
                    transition: "all 0.3s ease"
                  }}
                >
                  <VisualResultCard
                    image={article.image}
                    title={article.title}
                    description={article.description || "No description available."}
                    tags={[article.source?.name || "News", new Date(article.publishedAt).toLocaleDateString()]}
                    url={article.url}
                    layout="horizontal"
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </ConversationContainer>
    </>
  );
}

export default Search;
