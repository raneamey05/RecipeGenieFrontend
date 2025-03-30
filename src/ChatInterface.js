import React, { useState } from "react";
import ChatBubble from "./ChatBubble";
import "./ChatApp.css";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const userMessage = { message: userInput, isBot: false };
    setMessages([...messages, userMessage]);

    // Make a request to Flask backend
    const response = await fetch("http://127.0.0.1:5000/get_recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients: userInput }),
    });

    const data = await response.json();
    const botMessage = { message: data.reply, isBot: true };
    setMessages((prevMessages) => [...prevMessages, botMessage]);

    setUserInput(""); // Clear input field
  };

  return (
    <div className="chat-interface">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg.message} isBot={msg.isBot} />
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter ingredients..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatInterface;
