import React from "react";
import { CATEGORIES, APP_NAME, COLORS } from "../config/constants";

/**
 * AppHeader - Minimal header with color highlighting only
 */
const AppHeader = ({ selectedCategory, onCategorySelect }) => {
    return (
        <header style={{
            width: "100%",
            background: COLORS.background,
            borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
            padding: "1rem",
            position: "sticky",
            top: 0,
            zIndex: 1000,
            backdropFilter: "blur(10px)"
        }}>
            <div style={{
                maxWidth: "1200px",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem"
            }}>
                {/* App Branding */}
                <div style={{
                    fontSize: "1.25rem",
                    fontWeight: "700",
                    color: COLORS.grayDark,
                    letterSpacing: "0.5px"
                }}>
                    {APP_NAME}
                </div>

                {/* Category Navigation */}
                <nav style={{
                    display: "flex",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                    alignItems: "center"
                }}>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => onCategorySelect(cat.id)}
                            style={{
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "0.9rem",
                                fontWeight: "400",
                                color: selectedCategory === cat.id ? COLORS.primary : COLORS.gray,
                                padding: "0.5rem 1rem",
                                transition: "color 0.2s ease",
                                whiteSpace: "nowrap"
                            }}
                        >
                            {cat.icon} {cat.name}
                        </button>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default AppHeader;
