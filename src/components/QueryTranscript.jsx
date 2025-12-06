import React, { useState } from "react";

/**
 * QueryTranscript - Displays user's spoken text with states
 * Props:
 *   - text: string - The query text
 *   - state: "listening" | "processing" | "final"
 *   - variant: "minimal" | "bubble" (default: "minimal")
 *   - maxLength: number - Max chars before collapse (default: 100)
 */
const QueryTranscript = ({
    text,
    state = "final",
    variant = "minimal",
    maxLength = 100
}) => {
    const [expanded, setExpanded] = useState(false);

    const isLongText = text && text.length > maxLength;
    const displayText = (isLongText && !expanded)
        ? text.substring(0, maxLength) + "..."
        : text;

    const stateClasses = {
        listening: "ai-processing",
        processing: "ai-processing",
        final: ""
    };

    const bubbleContent = (
        <div className={`ai-card ${variant === "bubble" ? "ai-card-border" : ""} ${stateClasses[state]}`}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                <span className="ai-caption">You said:</span>
                {state === "listening" && <span className="ai-caption">●</span>}
                {state === "processing" && (
                    <div className="ai-typing-indicator" style={{ padding: 0 }}>
                        <div className="ai-typing-dot" style={{ width: "4px", height: "4px" }}></div>
                        <div className="ai-typing-dot" style={{ width: "4px", height: "4px" }}></div>
                        <div className="ai-typing-dot" style={{ width: "4px", height: "4px" }}></div>
                    </div>
                )}
            </div>

            <div className="ai-body" style={{ fontStyle: state === "listening" ? "italic" : "normal" }}>
                {displayText || (state === "listening" ? "Listening..." : "")}
            </div>

            {isLongText && (
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="ai-caption"
                    style={{
                        marginTop: "0.5rem",
                        cursor: "pointer",
                        color: "var(--accent-primary)",
                        background: "none",
                        border: "none",
                        padding: 0
                    }}
                >
                    {expanded ? "Show less" : "Show more"}
                </button>
            )}
        </div>
    );

    return bubbleContent;
};

export default QueryTranscript;
