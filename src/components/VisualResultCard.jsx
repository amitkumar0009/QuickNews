import React, { useState } from "react";

/**
 * VisualResultCard - Display visual/data-rich results
 * Props:
 *   - image: string (URL) - optional
 *   - title: string
 *   - description: string
 *   - tags: array of strings - optional
 *   - url: string - optional
 *   - layout: "grid" | "horizontal" | "minimal" (default: "grid")
 */
const VisualResultCard = ({
    image,
    title,
    description,
    tags = [],
    url,
    layout = "grid"
}) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const cardContent = (
        <div className="ai-card ai-component" style={{
            display: layout === "horizontal" ? "flex" : "block",
            gap: layout === "horizontal" ? "1rem" : 0
        }}>
            {image && (
                <div className="ai-image-container" style={{
                    marginBottom: layout === "grid" ? "1rem" : 0,
                    flexShrink: 0,
                    width: layout === "horizontal" ? "120px" : "100%",
                    height: layout === "horizontal" ? "120px" : "auto"
                }}>
                    <img
                        src={image}
                        alt={title}
                        className={`ai-image ${imageLoaded ? "loaded" : "loading"}`}
                        onLoad={() => setImageLoaded(true)}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                        }}
                    />
                </div>
            )}

            <div style={{ flex: 1 }}>
                <div className="ai-title">{title}</div>
                <div className="ai-body" style={{ marginTop: "0.5rem" }}>
                    {description}
                </div>

                {tags.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.75rem" }}>
                        {tags.map((tag, index) => (
                            <span key={index} className="ai-tag">{tag}</span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    if (url) {
        return (
            <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
                {cardContent}
            </a>
        );
    }

    return cardContent;
};

export default VisualResultCard;
