import React, { useState } from "react";

/**
 * AIResponseCard - General answer display card
 * Props:
 *   - title: string (optional)
 *   - content: string
 *   - variant: "flat" | "glass" | "border" (default: "flat")
 *   - showCopy: boolean (default: true)
 */
const AIResponseCard = ({
    title,
    content,
    variant = "flat",
    showCopy = true
}) => {
    const [copied, setCopied] = useState(false);

    const variantClasses = {
        flat: "ai-card",
        glass: "ai-card ai-card-glass",
        border: "ai-card ai-card-border"
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`${variantClasses[variant]} ai-component`}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                    {title && <div className="ai-title">{title}</div>}
                    <div className="ai-body">{content}</div>
                </div>

                {showCopy && (
                    <button
                        onClick={handleCopy}
                        className="ai-copy-btn"
                        title="Copy to clipboard"
                    >
                        {copied ? "✓" : "📋"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default AIResponseCard;
