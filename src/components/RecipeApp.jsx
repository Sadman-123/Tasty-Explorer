// src/RecipeApp.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';// Import CSS file for styling

const RecipeApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        setRecipes(response.data.meals);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchRecipes();
  }, [searchTerm]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="recipe-app">
      <h1 className="title">😋 Tasty Explorer</h1>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="recipes-container">
          {recipes ? (
            recipes.map(recipe => (
              <div className="recipe-card" key={recipe.idMeal}>
                <h2 className="recipe-name">{recipe.strMeal}</h2>
                <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image" />
                <h3 className="section-title">Ingredients</h3>
                <ul className="ingredients-list">
                  {Object.keys(recipe)
                    .filter(key => key.startsWith('strIngredient') && recipe[key])
                    .map(key => (
                      <li key={key}>{recipe[key]}</li>
                    ))}
                </ul>
                <h3 className="section-title">Instructions</h3>
                <p className="recipe-instructions">{recipe.strInstructions}</p>
              </div>
            ))
          ) : (
            <p>No recipes found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeApp;
