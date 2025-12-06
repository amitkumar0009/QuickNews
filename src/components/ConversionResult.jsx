import React from "react";

/**
 * ConversionResult - Display conversion results with visual indicators
 * Props:
 *   - from: object - { value, unit }
 *   - to: object - { value, unit }
 *   - type: string - conversion type (currency, length, weight, etc.)
 */
const ConversionResult = ({ from, to, type = "conversion" }) => {
    return (
        <div className="ai-card ai-component">
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "2rem",
                flexWrap: "wrap"
            }}>
                {/* From Value */}
                <div style={{
                    flex: "1",
                    minWidth: "150px",
                    textAlign: "center",
                    padding: "1.5rem",
                    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                    borderRadius: "12px",
                    color: "white"
                }}>
                    <div style={{ fontSize: "2rem", fontWeight: "700" }}>
                        {from.value}
                    </div>
                    <div style={{ fontSize: "0.875rem", opacity: 0.9, marginTop: "0.25rem" }}>
                        {from.unit}
                    </div>
                </div>

                {/* Arrow */}
                <div style={{
                    fontSize: "2rem",
                    color: "#9ca3af"
                }}>
                    →
                </div>

                {/* To Value */}
                <div style={{
                    flex: "1",
                    minWidth: "150px",
                    textAlign: "center",
                    padding: "1.5rem",
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    borderRadius: "12px",
                    color: "white"
                }}>
                    <div style={{ fontSize: "2rem", fontWeight: "700" }}>
                        {to.value}
                    </div>
                    <div style={{ fontSize: "0.875rem", opacity: 0.9, marginTop: "0.25rem" }}>
                        {to.unit}
                    </div>
                </div>
            </div>

            {/* Conversion Type Label */}
            <div style={{
                textAlign: "center",
                marginTop: "1rem",
                fontSize: "0.75rem",
                color: "#6b7280",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
            }}>
                {type} conversion
            </div>
        </div>
    );
};

export default ConversionResult;
