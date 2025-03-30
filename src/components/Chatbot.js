import React, { useState, useEffect, useRef } from "react";
import "../components/ChatApp.css";  // ✅ Correct path
import bgImage from "../assets/chatbot-bg.jpg";

<div className="chatbot-container" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}></div>
function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hello! Enter ingredients to get recipes.", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [showExtraButtons, setShowExtraButtons] = useState(false);
  const chatBoxRef = useRef(null);
  const inputRef = useRef(null);

  // ✅ Auto-scroll to latest message
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // ✅ Send message when Enter is pressed
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
      }
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("keypress", handleKeyPress);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("keypress", handleKeyPress);
      }
    };
  }, []);

  // ✅ Function to send ingredients and get matching recipes
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
        const formattedResponse = data.response
          .replace(/\n/g, "<br>")
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

        setMessages((prev) => [...prev, { text: formattedResponse, sender: "bot", isHTML: true }]);
      } else {
        setMessages((prev) => [...prev, { text: "⚠️ No recipes found!", sender: "bot" }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { text: "❌ Sorry, there was an error processing your request.", sender: "bot" }]);
      console.error("Error fetching recipes:", error);
    }

    setInput("");
  };

  // ✅ Fetch a single random recipe
  const getRandomRecipe = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/random-recipe");
      const data = await response.json();

      if (data.response) {
        const formattedResponse = data.response
          .replace(/\n/g, "<br>")
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

        setMessages((prev) => [...prev, { text: formattedResponse, sender: "bot", isHTML: true }]);
      } else {
        setMessages((prev) => [...prev, { text: "❌ No random recipe found.", sender: "bot" }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { text: "❌ Error fetching random recipe.", sender: "bot" }]);
      console.error("Error fetching random recipe:", error);
    }
  };

  // ✅ Fetch 3 random recipes
  const getThreeRandomRecipes = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/three-random-recipes");
      const data = await response.json();

      if (data.response) {
        const formattedResponse = data.response
          .replace(/\n/g, "<br>")
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

        setMessages((prev) => [...prev, { text: formattedResponse, sender: "bot", isHTML: true }]);
      } else {
        setMessages((prev) => [...prev, { text: "❌ No random recipes found.", sender: "bot" }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { text: "❌ Error fetching random recipes.", sender: "bot" }]);
      console.error("Error fetching random recipes:", error);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-container">
        <div className="chat-box" ref={chatBoxRef}>
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
            ref={inputRef} // ✅ Added ref for Enter key listener
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter ingredients..."
          />
          <button onClick={sendMessage}>Send</button>

          {/* ✅ Plus button to toggle extra options */}
          <button className="plus-button" onClick={() => setShowExtraButtons(!showExtraButtons)}>+</button>

          {/* ✅ Extra options appear when plus button is clicked */}
          {showExtraButtons && (
            <div className="extra-buttons">
              <button onClick={getRandomRecipe} className="random-recipe-btn">🎲 Random Recipe</button>
              <button onClick={getThreeRandomRecipes} className="three-random-btn"> 🔥Top 3 Trending Recipes</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
