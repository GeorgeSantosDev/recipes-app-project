import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [recipesToRender, setRecipesToRender] = useState([]);
  const [drinksRecipes, setDrinksRecipes] = useState([]);
  const [mealsRecipes, setMealsRecipes] = useState([]);
  const [ingredientCheck, setIngredientCheck] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filter, setFilter] = useState('all');

  const contextValues = {
    recipesToRender,
    setRecipesToRender,
    drinksRecipes,
    setDrinksRecipes,
    mealsRecipes,
    setMealsRecipes,
    ingredientCheck,
    setIngredientCheck,
    filter,
    setFilter,
    favoriteRecipes,
    setFavoriteRecipes,
  };

  return (
    <RecipesContext.Provider value={ contextValues }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
