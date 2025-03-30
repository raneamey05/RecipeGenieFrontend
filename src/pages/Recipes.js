import React, { useState } from "react";

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/search?name=${searchQuery}`);
      const data = await response.json();
      setRecipes(data.recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Search Recipes</h2>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Enter recipe name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
        <button onClick={handleSearch} style={styles.searchButton}>
          Search
        </button>
      </div>

      <div style={styles.resultsContainer}>
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <div key={index} style={styles.recipeCard}>
              <h3>{recipe.name}</h3>
              <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
              <p><strong>Description:</strong> {recipe.description}</p>
            </div>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    paddingTop: "50px",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  },
  searchInput: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid black",
    borderRadius: "5px",
    width: "300px",
    backgroundColor: "black",
    color: "white",
  },
  searchButton: {
    padding: "10px 15px",
    fontSize: "16px",
    backgroundColor: "#6a0dad",
    color: "white",
    border: "none",
    borderRadius: "5px",
    marginLeft: "5px",
    cursor: "pointer",
  },
  resultsContainer: {
    marginTop: "20px",
  },
  recipeCard: {
    marginBottom: "20px",
    padding: "10px",
    border: "1px solid #ccc",
    backgroundColor: "white",
    borderRadius: "8px",
    maxWidth: "500px",
    margin: "auto",
  },
};

export default Recipes;
