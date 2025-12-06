import React from "react";

/**
 * StepGuide - Display step-by-step instructions
 * Props:
 *   - title: string - guide title
 *   - steps: array of strings - step descriptions
 */
const StepGuide = ({ title, steps = [] }) => {
    return (
        <div className="ai-card ai-component">
            {title && <div className="ai-title" style={{ marginBottom: "1rem" }}>{title}</div>}

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {steps.map((step, index) => (
                    <div
                        key={index}
                        style={{
                            display: "flex",
                            gap: "1rem",
                            alignItems: "flex-start"
                        }}
                    >
                        {/* Step Number */}
                        <div style={{
                            minWidth: "2.5rem",
                            height: "2.5rem",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "600",
                            fontSize: "1rem",
                            flexShrink: 0
                        }}>
                            {index + 1}
                        </div>

                        {/* Step Content */}
                        <div style={{
                            flex: 1,
                            padding: "0.5rem 0",
                            fontSize: "0.95rem",
                            lineHeight: "1.6",
                            color: "#374151"
                        }}>
                            {step}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StepGuide;
