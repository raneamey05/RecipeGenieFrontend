import React from "react";
import "./MessageDisplay.css";

function MessageDisplay({ message, isBot }) {
  return (
    <div className={`message ${isBot ? "bot" : "user"}`}>
      {Array.isArray(message) ? (
        message.map((line, index) => <p key={index}>{line}</p>)
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
}

export default MessageDisplay;
