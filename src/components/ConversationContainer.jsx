import React, { useEffect, useRef } from "react";

/**
 * ConversationContainer - Master layout for all conversation elements
 * Props:
 *   - children: React nodes - all conversation components
 *   - autoScroll: boolean (default: true) - auto-scroll to newest message
 *   - maxMessages: number - optional, collapse older messages
 *   - maxWidth: number (default: 1400) - maximum width in pixels
 */
const ConversationContainer = ({
    children,
    autoScroll = true,
    maxMessages,
    maxWidth = 1500
}) => {
    const containerRef = useRef(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        if (autoScroll && bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [children, autoScroll]);

    return (
        <div
            ref={containerRef}
            className="ai-conversation-gap"
            style={{
                padding: "1.5rem",
                width: "100%",
                maxWidth: `${maxWidth}px`,
                margin: "0 auto",
                borderRadius: "24px",
                background: "rgba(59, 130, 246, 0.08)"
            }}
        >
            {children}
            <div ref={bottomRef} />
        </div>
    );
};

export default ConversationContainer;
