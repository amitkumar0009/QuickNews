import React, { useEffect, useState } from "react";
import ShowNews from "./ShowNews";
import Search from "./Search";
import AppHeader from "./AppHeader";
import DynamicGreeting from "./DynamicGreeting";
import ExampleHints from "./ExampleHints";
import AppFooter from "./AppFooter";
import ComparisonView from "./ComparisonView";
import StepGuide from "./StepGuide";
import DefinitionCard from "./DefinitionCard";
import ConversionResult from "./ConversionResult";
import AIResponseCard from "./AIResponseCard";
import ConversationContainer from "./ConversationContainer";

const Home = () => {
  const [query, setQuery] = useState("");
  const [listening, setListening] = useState(false);
  const [shownews, setShowNews] = useState(false);
  const [cate, setCate] = useState("");
  const [heading_number, setheading_number] = useState("-1");
  const [searchactive, setSearchactive] = useState(false);
  const [selectedFunction, setSelectedFunction] = useState("all");
  const [demoMode, setDemoMode] = useState(false); // Toggle for demo examples

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedFunction(categoryId);
    if (categoryId !== "all") {
      setCate(categoryId);
      setShowNews(true);
      setSearchactive(false);
    } else {
      setShowNews(false);
      setSearchactive(false);
    }
  };

  // 📝 two states for search
  const [tempQuery, setTempQuery] = useState("");   // value in input box
  const [searchquery, setSearchQuery] = useState(""); // actual search trigger

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
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
        "one", "two", "three", "four", "five",
        "six", "seven", "eight", "nine", "ten",
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

  // 🗑️ Clear search input
  const clearSearch = () => {
    setTempQuery("");
  };

  //Welcome
  const speakingtext = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }

  useEffect(() => {
    if (!window.speechSynthesis.speaking) {
      const utterance = new SpeechSynthesisUtterance(
        "Welcome to Voice Assist! Ask me anything - get news, comparisons, explanations, recommendations, and more."
      );

      // 👇 run after speaking finishes
      utterance.onend = () => {
        setListening(true);
        handleVoiceInput()
      };

      window.speechSynthesis.speak(utterance);
    }
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* App Header with Categories */}
      <AppHeader
        selectedCategory={selectedFunction}
        onCategorySelect={handleCategorySelect}
      />

      <div className="flex flex-col items-center gap-6 mt-6" style={{ width: "100%", maxWidth: "100%", flex: 1 }}>
        {/* Dynamic Greeting */}
        <DynamicGreeting />

        {/* Example Hints */}
        <ExampleHints />

        {/* Main Search Bar */}
        <div className="relative w-full max-w-2xl">
          <input
            type="text"
            placeholder={listening ? "🎤 Listening..." : "Ask me anything..."}
            value={tempQuery}
            onChange={(e) => setTempQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && triggerSearch()}
            className="search-input border pl-6 pr-28 py-4 rounded-full w-full text-base focus:outline-none transition-all"
          />

          {/* Right side icons container */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {/* Mic button */}
            <button
              onClick={handleVoiceInput}
              className={`w-11 h-11 flex items-center justify-center rounded-full transition-all duration-300 ${listening
                ? "bg-red-500 text-white animate-pulse shadow-lg"
                : "text-gray-500 hover:text-green-500 hover:bg-gray-100"
                }`}
              title="Voice search"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </button>

            {/* Dynamic button - Search OR Clear */}
            {tempQuery.trim() ? (
              <button
                onClick={clearSearch}
                className="bg-gray-400 text-white w-11 h-11 rounded-full flex items-center justify-center hover:bg-gray-500 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                title="Clear search"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => triggerSearch()}
                className="bg-teal-500 text-white w-11 h-11 rounded-full flex items-center justify-center hover:bg-teal-600 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                title="Search"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Demo Toggle (temporary for testing) */}
        <button
          onClick={() => setDemoMode(!demoMode)}
          style={{
            fontSize: "0.875rem",
            padding: "0.5rem 1rem",
            background: demoMode ? "#3b82f6" : "#e5e7eb",
            color: demoMode ? "white" : "#374151",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
            marginTop: "1rem"
          }}
        >
          {demoMode ? "Hide" : "Show"} Component Examples
        </button>

        {/* Show News by category or search */}
        {shownews && <ShowNews category={cate} heading_number={heading_number} />}
        {searchactive && <Search searchquery={searchquery} />}

        {/* Demo Examples */}
        {demoMode && (
          <div style={{ width: "100%", maxWidth: "1200px", padding: "0 1rem", marginTop: "2rem" }}>
            <ConversationContainer autoScroll={false}>
              {/* Comparison Example */}
              <ComparisonView
                title="iPhone 15 vs Samsung S24"
                itemA={{
                  name: "iPhone 15",
                  features: {
                    "Price": "$999",
                    "Display": "6.1 inches",
                    "Processor": "A17 Pro",
                    "Camera": "48MP",
                    "Battery": "20 hours"
                  }
                }}
                itemB={{
                  name: "Samsung S24",
                  features: {
                    "Price": "$899",
                    "Display": "6.2 inches",
                    "Processor": "Snapdragon 8 Gen 3",
                    "Camera": "50MP",
                    "Battery": "18 hours"
                  }
                }}
              />

              {/* Step Guide Example */}
              <StepGuide
                title="How to Make Perfect Coffee"
                steps={[
                  "Start with fresh, cold water and quality coffee beans",
                  "Grind beans to medium-coarse consistency",
                  "Use 2 tablespoons of coffee per 6 ounces of water",
                  "Brew at 195-205°F for 4-5 minutes",
                  "Enjoy immediately for best flavor!"
                ]}
              />

              {/* Definition Example */}
              <DefinitionCard
                term="Machine Learning"
                category="noun"
                definition="A subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed."
                examples={[
                  "Netflix uses machine learning to recommend shows",
                  "Self-driving cars rely on machine learning algorithms"
                ]}
              />

              {/* Conversion Example */}
              <ConversionResult
                from={{ value: "100", unit: "USD" }}
                to={{ value: "83.50", unit: "EUR" }}
                type="Currency"
              />

              {/* General Answer Example */}
              <AIResponseCard
                title="What is Quantum Computing?"
                content="Quantum computing is a type of computation that harnesses the collective properties of quantum states to perform calculations. Unlike classical computers that use bits (0 or 1), quantum computers use quantum bits or 'qubits' that can exist in multiple states simultaneously, potentially solving certain problems exponentially faster."
                variant="glass"
              />
            </ConversationContainer>
          </div>
        )}
      </div>

      {/* Footer */}
      <AppFooter />
    </div>
  );
};

export default Home;
