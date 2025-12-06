import React from "react";

/**
 * ComparisonView - Display side-by-side comparison of two items
 * Props:
 *   - title: string - comparison title
 *   - itemA: object - { name, features: {} }
 *   - itemB: object - { name, features: {} }
 */
const ComparisonView = ({ title, itemA, itemB }) => {
    const features = Object.keys(itemA.features || {});

    return (
        <div className="ai-card ai-component">
            {title && <div className="ai-title" style={{ marginBottom: "1rem" }}>{title}</div>}

            <div style={{
                display: "grid",
                gridTemplateColumns: "200px 1fr 1fr",
                gap: "0.75rem",
                fontSize: "0.9rem"
            }}>
                {/* Header Row */}
                <div style={{ fontWeight: "600", color: "#374151" }}>Feature</div>
                <div style={{ fontWeight: "600", color: "#2563eb", textAlign: "center" }}>{itemA.name}</div>
                <div style={{ fontWeight: "600", color: "#7c3aed", textAlign: "center" }}>{itemB.name}</div>

                {/* Feature Rows */}
                {features.map((feature, idx) => (
                    <React.Fragment key={idx}>
                        <div style={{
                            padding: "0.75rem",
                            backgroundColor: idx % 2 === 0 ? "rgba(0,0,0,0.02)" : "transparent",
                            borderRadius: "4px",
                            fontWeight: "500"
                        }}>
                            {feature}
                        </div>
                        <div style={{
                            padding: "0.75rem",
                            backgroundColor: idx % 2 === 0 ? "rgba(37, 99, 235, 0.05)" : "transparent",
                            borderRadius: "4px",
                            textAlign: "center"
                        }}>
                            {itemA.features[feature]}
                        </div>
                        <div style={{
                            padding: "0.75rem",
                            backgroundColor: idx % 2 === 0 ? "rgba(124, 58, 237, 0.05)" : "transparent",
                            borderRadius: "4px",
                            textAlign: "center"
                        }}>
                            {itemB.features[feature]}
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default ComparisonView;
