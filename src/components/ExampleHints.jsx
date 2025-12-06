import React, { useState, useEffect } from "react";
import { EXAMPLE_QUERIES } from "../config/constants";

/**
 * ExampleHints - Rotating example queries to guide users
 */
const ExampleHints = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % EXAMPLE_QUERIES.length);
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, []);

    const currentQuery = EXAMPLE_QUERIES[currentIndex];

    return (
        <div style={{
            textAlign: "center",
            padding: "0.5rem",
            color: "#6b7280",
            fontSize: "0.9rem"
        }}>
            <span style={{
                opacity: 0.8,
                animation: "fadeInOut 3s ease-in-out infinite"
            }}>
                {currentQuery.icon} Try: "{currentQuery.text}"
            </span>
            <style>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
        </div>
    );
};

export default ExampleHints;
