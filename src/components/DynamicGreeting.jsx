import React, { useState, useEffect } from "react";
import { GREETINGS } from "../config/constants";

/**
 * DynamicGreeting - Animated greeting that changes on each load
 */
const DynamicGreeting = () => {
    const [greeting, setGreeting] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Get time-based greeting
        const hour = new Date().getHours();
        let timeBasedGreeting = "";

        if (hour < 12) {
            timeBasedGreeting = GREETINGS.timeBased.morning;
        } else if (hour < 17) {
            timeBasedGreeting = GREETINGS.timeBased.afternoon;
        } else if (hour < 21) {
            timeBasedGreeting = GREETINGS.timeBased.evening;
        } else {
            timeBasedGreeting = GREETINGS.timeBased.night;
        }

        // Combine both and pick randomly
        const allGreetings = [...GREETINGS.casual, timeBasedGreeting];
        const randomGreeting = allGreetings[Math.floor(Math.random() * allGreetings.length)];

        setGreeting(randomGreeting);

        // Trigger fade-in animation
        setTimeout(() => setIsVisible(true), 100);
    }, []);

    return (
        <div style={{
            textAlign: "center",
            padding: "1rem 1rem 0.5rem",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(-20px)",
            transition: "all 1s ease-out"
        }}>
            <h2 style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "0.5rem"
            }}>
                {greeting}
            </h2>
        </div>
    );
};

export default DynamicGreeting;
