import React, { useState } from "react";
import "./recipes.css"; // Import the CSS file

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert("Please enter a recipe name to search.");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/search?name=${encodeURIComponent(searchQuery)}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.recipes || data.recipes.length === 0) {
        setRecipes([]); // Show "No recipes found."
      } else {
        setRecipes(data.recipes);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      alert("Failed to fetch recipes. Check the console for details.");
    }
  };

  return (
    <div className="recipes-container">
      <h2 className="recipes-heading">Search for Recipes</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter recipe name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      <div className="results-container">
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <h3>{recipe.name}</h3>
              <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
              <p><strong>Description:</strong> {recipe.description}</p>
            </div>
          ))
        ) : (
          <p className="no-recipes">No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default Recipes;
