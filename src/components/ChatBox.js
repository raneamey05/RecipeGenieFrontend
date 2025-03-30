import React, { useState } from "react";
import "./ChatApp.css";

function App() {
  const [messages, setMessages] = useState([
    { text: "Hello! Enter ingredients to get recipes.", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  // ✅ Function to fetch recipes based on user input
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("http://127.0.0.1:5000/get_recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: input })
      });

      const data = await response.json();

      if (data.response) {
        // Format response with line breaks and bold text
        const formattedResponse = data.response
          .replace(/\n/g, "<br>")
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

        setMessages((prev) => [...prev, { text: formattedResponse, sender: "bot", isHTML: true }]);
      } else {
        setMessages((prev) => [...prev, { text: "⚠️ No recipes found!", sender: "bot" }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { text: "❌ Error processing request.", sender: "bot" }]);
      console.error("Error fetching recipes:", error);
    }

    setInput(""); // Clear input
  };

  // ✅ Function to fetch 3 random recipes
  const getRandomRecipes = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/trending-recipes");
      const data = await response.json();

      if (data.response) {
        const formattedResponse = data.response
          .replace(/\n/g, "<br>")
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

        setMessages((prev) => [...prev, { text: formattedResponse, sender: "bot", isHTML: true }]);
      } else {
        setMessages((prev) => [...prev, { text: "⚠️ No recipes found!", sender: "bot" }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { text: "❌ Error fetching random recipes.", sender: "bot" }]);
      console.error("Error:", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.isHTML ? <span dangerouslySetInnerHTML={{ __html: msg.text }} /> : msg.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter ingredients..."
        />
        <button onClick={sendMessage}>Send</button>
        <button onClick={getRandomRecipes}>🎲 Get 3 Random Recipes</button>
      </div>
    </div>
  );
}

export default App;
