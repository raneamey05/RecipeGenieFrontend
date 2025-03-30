import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Import Navbar
import "./Home.css"; // Ensure correct CSS path
import bgImage from "../assets/bg_image.png"; // Import background image

const Home = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="home-container" style={{ backgroundImage: `url(${bgImage})` }}>
      {/* Include Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="hero-section">
        <h1>Welcome to <span className="highlight">RecipeGenie</span> 🍽</h1>
        <p className="hero-subtext">
          "Cooking is an art, and every dish tells a story. Let RecipeGenie help you craft yours with ingredients you already have!"
        </p>
      </div>

      {/* Share Recipes Section with Full-Width Grey Background */}
      <div className="message-box">
        <div className="content">
          <h2>Want Delicious Recipes? 🍜</h2>
          <p>Enter the ingredients you have, and let our RecipeGenie surprise you with the best recipes!</p>
          <button className="create-recipe-btn" onClick={() => navigate("/chatbot")}>
            Start Chatting with "RecipeGenie"
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;