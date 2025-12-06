import React from "react";

/**
 * FunctionSelector - Category chips for selecting news categories
 * Props:
 *   - onSelect: function - callback when a category is selected
 *   - selected: string - currently selected category
 */
const FunctionSelector = ({ onSelect, selected }) => {
    const categories = [
        { id: "all", name: "All", icon: "🎯" },
        { id: "general", name: "General", icon: "📰" },
        { id: "world", name: "World", icon: "🌍" },
        { id: "nation", name: "Nation", icon: "🏛️" },
        { id: "business", name: "Business", icon: "💼" },
        { id: "technology", name: "Technology", icon: "💻" },
        { id: "entertainment", name: "Entertainment", icon: "🎬" },
        { id: "sports", name: "Sports", icon: "⚽" },
        { id: "science", name: "Science", icon: "🔬" },
        { id: "health", name: "Health", icon: "🏥" },
    ];

    return (
        <div style={{
            display: "flex",
            gap: "0.5rem",
            padding: "0.5rem 0",
            overflowX: "auto",
            scrollbarWidth: "thin",
            WebkitOverflowScrolling: "touch"
        }}>
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => onSelect(cat.id)}
                    className={selected === cat.id ? "ai-chip ai-chip-colored" : "ai-chip"}
                    style={{
                        fontSize: "0.875rem",
                        padding: "0.625rem 1.25rem",
                        whiteSpace: "nowrap",
                        transition: "all 0.2s ease",
                        cursor: "pointer"
                    }}
                >
                    {cat.icon} {cat.name}
                </button>
            ))}
        </div>
    );
};

export default FunctionSelector;
