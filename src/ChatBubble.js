import React from "react";
import "./ChatApp.css";

const ChatBubble = ({ message, isBot }) => {
  return (
    <div className={isBot ? "chat-bubble bot" : "chat-bubble user"}>
      {message}
    </div>
  );
};

export default ChatBubble;
