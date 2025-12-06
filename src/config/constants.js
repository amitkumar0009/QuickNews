/**
 * Application Constants and Configuration
 * Centralized configuration for the Vaani application
 */

// Application Info
export const APP_NAME = "Vaani";

// News Categories
export const CATEGORIES = [
    { id: "all", name: "All", icon: "🎯" },
    { id: "general", name: "General", icon: "📰" },
    { id: "world", name: "World", icon: "🌍" },
    { id: "nation", name: "Nation", icon: "🏛️" },
    { id: "business", name: "Business", icon: "💼" },
    { id: "technology", name: "Technology", icon: "💻" },
    { id: "entertainment", name: "Entertainment", icon: "🎬" },
    { id: "sports", name: "Sports", icon: "⚽" },
    { id: "science", name: "Science", icon: "🔬" },
    { id: "health", name: "Health", icon: "🏥" },
];

// Example Queries for user hints
export const EXAMPLE_QUERIES = [
    { text: "Compare iPhone 15 vs Samsung S24", icon: "⚖️" },
    { text: "How to make homemade pizza?", icon: "📖" },
    { text: "What is quantum computing?", icon: "❓" },
    { text: "Latest technology news", icon: "💻" },
    { text: "Convert 100 USD to EUR", icon: "💱" },
    { text: "Define artificial intelligence", icon: "🤖" },
];

// Greeting Messages
export const GREETINGS = {
    casual: [
        "Welcome back! What would you like to explore today?",
        "Hey there! Ready to discover something new?",
        "Good to see you! What's on your mind?",
        "Hello! Let's find what you're looking for.",
        "Hi! What can I help you with today?",
        "Welcome! Your AI assistant is ready.",
        "Greetings! What brings you here today?",
        "Hey! Let's get started with your query.",
        "Welcome aboard! What shall we explore?",
        "Hi there! Ready to dive into something interesting?"
    ],
    timeBased: {
        morning: "Good morning! How can I assist you today?",
        afternoon: "Good afternoon! What would you like to know?",
        evening: "Good evening! Let's find some answers.",
        night: "Good night! Still curious? I'm here to help."
    }
};

// Color Scheme
export const COLORS = {
    primary: "#3b82f6",
    primaryLight: "rgba(59, 130, 246, 0.1)",
    gray: "#6b7280",
    grayDark: "#1f2937",
    white: "#ffffff",
    background: "rgba(255, 255, 255, 0.98)",
};

// AI Capabilities
export const AI_CAPABILITIES = [
    { icon: "💬", title: "General Q&A", desc: "Get answers to any question" },
    { icon: "📝", title: "Summaries", desc: "Condense long text into key points" },
    { icon: "🔍", title: "Explanations", desc: "Understand complex topics" },
    { icon: "📖", title: "How-To Guides", desc: "Step-by-step instructions" },
    { icon: "🔎", title: "Search", desc: "Find information quickly" },
    { icon: "⚖️", title: "Comparisons", desc: "Compare products or concepts" },
    { icon: "📚", title: "Definitions", desc: "Learn word meanings" },
    { icon: "💡", title: "Recommendations", desc: "Get personalized suggestions" },
    { icon: "✅", title: "Fact Retrieval", desc: "Verify information" },
    { icon: "💱", title: "Conversions", desc: "Convert units and currencies" },
    { icon: "⏰", title: "Time Info", desc: "Get time-based information" },
    { icon: "🎯", title: "Topic Discovery", desc: "Explore new subjects" },
    { icon: "🏷️", title: "Classification", desc: "Categorize information" },
    { icon: "📰", title: "News", desc: "Latest news by category" },
    { icon: "❗", title: "Error Fixing", desc: "Troubleshoot and debug" }
];

// Quick Links for Footer
export const QUICK_LINKS = [
    { text: "About", href: "#about" },
    { text: "How It Works", href: "#how" },
    { text: "Privacy", href: "#privacy" },
    { text: "Feedback", href: "#feedback" }
];

// Welcome Message
export const WELCOME_MESSAGE =
    "Welcome to Voice Assist! Ask me anything - get news, comparisons, explanations, recommendations, and more.";
