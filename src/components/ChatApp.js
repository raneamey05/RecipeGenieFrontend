import React, { useState } from "react";
import "./ChatApp.css"; // Ensure this file exists and is correctly linked

function ChatApp() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;
    try {
      const res = await fetch("http://localhost:5000/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setResponse(data.reply);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="chat-container"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/chat_inter.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2>Welcome to the Recipe Chatbot!</h2>
      <div className="chat-box">
        <input
          type="text"
          placeholder="Enter ingredients..."
          value={input}
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit}>Get Recipes</button>
      </div>
      {response && <div className="response-box">{response}</div>}
    </div>
  );
}

export default ChatApp;
