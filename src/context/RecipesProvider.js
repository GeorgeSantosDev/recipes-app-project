import React, { useState } from 'react';
import PropTypes from 'prop-types';
import recipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [user, setUser] = useState('');
  const [drinks, setDrinks] = useState([]);
  const [meals, setMeals] = useState([]);
  const [recipesToRender, setRecipesToRender] = useState([]);
  const [whatIsRender, setWhatIsRender] = useState('meals');
  const [isFilter, setIsFilter] = useState(false);
  const [CategoriesFilter, setCategoriesFilter] = React.useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const contextValues = {
    user,
    setUser,
    drinks,
    setDrinks,
    meals,
    setMeals,
    recipesToRender,
    setRecipesToRender,
    whatIsRender,
    setWhatIsRender,
    CategoriesFilter,
    setCategoriesFilter,
    isFilter,
    setIsFilter,
    favoriteRecipes,
    setFavoriteRecipes,

  };

  return (
    <recipesContext.Provider value={ contextValues }>
      { children }
    </recipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
