import React from "react";
import { AI_CAPABILITIES, QUICK_LINKS, APP_NAME } from "../config/constants";

/**
 * AppFooter - Showcases all capabilities and provides quick links
 */
const AppFooter = () => {
    // Group capabilities by category
    const capabilitiesByCategory = {
        "Information": AI_CAPABILITIES.slice(0, 5),
        "Understanding": AI_CAPABILITIES.slice(5, 10),
        "Utilities": AI_CAPABILITIES.slice(10)
    };

    return (
        <footer style={{
            marginTop: "4rem",
            padding: "2rem 1rem",
            background: "linear-gradient(to bottom, rgba(249, 250, 251, 0), rgba(249, 250, 251, 1))",
            borderTop: "1px solid rgba(0, 0, 0, 0.05)"
        }}>
            <div style={{
                maxWidth: "1200px",
                margin: "0 auto"
            }}>
                {/* Capabilities Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "2rem",
                    marginBottom: "2rem"
                }}>
                    {Object.entries(capabilitiesByCategory).map(([category, caps]) => (
                        <div key={category}>
                            <h3 style={{
                                fontSize: "0.875rem",
                                fontWeight: "600",
                                color: "#374151",
                                marginBottom: "0.75rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em"
                            }}>
                                {category}
                            </h3>
                            <ul style={{
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                                fontSize: "0.875rem",
                                color: "#6b7280"
                            }}>
                                {caps.map((cap, idx) => (
                                    <li key={idx} style={{ marginBottom: "0.5rem" }}>
                                        {cap.icon} {cap.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Quick Links */}
                <div style={{
                    borderTop: "1px solid rgba(0, 0, 0, 0.05)",
                    paddingTop: "1.5rem",
                    display: "flex",
                    justifyContent: "center",
                    gap: "2rem",
                    flexWrap: "wrap",
                    fontSize: "0.875rem",
                    color: "#6b7280"
                }}>
                    {QUICK_LINKS.map((link, idx) => (
                        <a
                            key={idx}
                            href={link.href}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            {link.text}
                        </a>
                    ))}
                </div>

                {/* Copyright */}
                <div style={{
                    textAlign: "center",
                    marginTop: "1.5rem",
                    fontSize: "0.75rem",
                    color: "#9ca3af"
                }}>
                    © 2024 {APP_NAME}. Your intelligent assistant for everything.
                </div>
            </div>
        </footer>
    );
};

export default AppFooter;
