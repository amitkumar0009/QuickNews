import React from "react";

/**
 * DefinitionCard - Display word/concept definitions with examples
 * Props:
 *   - term: string - the term being defined
 *   - definition: string - the definition
 *   - examples: array - usage examples (optional)
 *   - category: string - word category like "noun", "verb" (optional)
 */
const DefinitionCard = ({ term, definition, examples = [], category }) => {
    return (
        <div className="ai-card ai-component">
            {/* Term Header */}
            <div style={{ marginBottom: "1rem" }}>
                <div style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#1f2937",
                    marginBottom: "0.25rem"
                }}>
                    {term}
                </div>
                {category && (
                    <div style={{
                        fontSize: "0.75rem",
                        color: "#6b7280",
                        fontStyle: "italic",
                        textTransform: "lowercase"
                    }}>
                        {category}
                    </div>
                )}
            </div>

            {/* Definition */}
            <div className="ai-body" style={{ marginBottom: "1rem" }}>
                {definition}
            </div>

            {/* Examples */}
            {examples.length > 0 && (
                <div>
                    <div style={{
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: "0.5rem"
                    }}>
                        Examples:
                    </div>
                    <ul style={{
                        margin: 0,
                        paddingLeft: "1.5rem",
                        color: "#6b7280",
                        fontSize: "0.9rem"
                    }}>
                        {examples.map((example, idx) => (
                            <li key={idx} style={{ marginBottom: "0.25rem" }}>
                                <em>"{example}"</em>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DefinitionCard;
