import React, { useState } from "react";
import ShowNews from "./ShowNews";
import Search from "./Search";

const Home = () => {
  const [query, setQuery] = useState("");
  const [listening, setListening] = useState(false);
  const [shownews, setShowNews] = useState(false);
  const [cate, setCate] = useState("");
  const [heading_number, setheading_number] = useState("-1");
  const [searchactive, setSearchactive] = useState(false);

  // 📝 two states for search
  const [tempQuery, setTempQuery] = useState("");   // value in input box
  const [searchquery, setSearchQuery] = useState(""); // actual search trigger

  // 🎤 Voice input using Web Speech API
  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recog = new SpeechRecognition();
    recog.lang = "en-US";

    recog.onstart = () => setListening(true);
    recog.onend = () => setListening(false);

    recog.onresult = (event) => {
      const spokenText = event.results[0][0].transcript.toLowerCase();
      setQuery(spokenText);

      const category = [
        "general",
        "world",
        "nation",
        "business",
        "technology",
        "entertainment",
        "sports",
        "science",
        "health",
      ];

      const heading_num = [
        "1","2","3","4","5","6","7","8","9","10",
        "one","two","three","four","five",
        "six","seven","eight","nine","ten",
      ];

      // Find matches
      const matches = [];
      category.forEach((c) => {
        if (spokenText.includes(c)) matches.push(c);
      });
      heading_num.forEach((h) => {
        if (spokenText.includes(h)) matches.push(h);
      });

      if (matches.length === 0) {
        // 👉 Treat spoken text as search query
        setTempQuery(spokenText);   // also reflect in input box
        triggerSearch(spokenText);
      } else if (matches.length > 1) {
        alert("❌ Multiple matches found: " + matches.join(", "));
      } else {
        setShowNews(true);
        setCate(matches[0]);
      }
    };

    recog.start();
  };

  // 🔍 Manual + Voice search trigger
  const triggerSearch = (queryText = tempQuery) => {
    if (!queryText.trim()) {
      alert("Please enter a search query.");
      return;
    }
    setShowNews(false);
    setSearchactive(false);
    setSearchQuery(queryText);   // now commit input to actual query
    setSearchactive(true);
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-10">
      <h1 className="text-2xl font-bold">🔍 Simple Search</h1>

      {/* Input + Search button */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search..."
          value={tempQuery}
          onChange={(e) => setTempQuery(e.target.value)} // temp only
          className="border px-4 py-2 rounded-md w-64"
        />
        <button
          onClick={() => triggerSearch()}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </div>

      {/* 🎤 Mic button */}
      <button
        onClick={handleVoiceInput}
        className={`w-16 h-16 flex items-center justify-center rounded-full text-2xl shadow-md transition-all duration-300 ${
          listening
            ? "bg-red-500 text-white animate-pulse shadow-lg shadow-red-400"
            : "bg-green-500 text-white hover:bg-green-600"
        }`}
      >
        🎤
      </button>

      {listening && (
        <p className="text-sm text-red-500 font-medium">Listening...</p>
      )}

      {/* Show News by category or search */}
      {shownews && <ShowNews category={cate} heading_number={heading_number} />}
      {searchactive && <Search searchquery={searchquery} />}
    </div>
  );
};

export default Home;
