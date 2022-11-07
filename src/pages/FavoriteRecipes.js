import React, { useEffect, useContext } from 'react';
import { getStorage } from '../services/Storage';
import recipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Filters from '../components/Filters';
import FavoriteRecipeCard from '../components/FavoriteRecipesCard';

function FavoriteRecipes() {
  const { favoriteRecipes, setFavoriteRecipes, filter } = useContext(recipesContext);

  const getFavoriteRecipes = getStorage('favoriteRecipes');

  useEffect(() => {
    if (getFavoriteRecipes) {
      setFavoriteRecipes(getFavoriteRecipes);
    }
  }, []);

  useEffect(() => {
    if (getFavoriteRecipes) {
      const filters = {
        all: getFavoriteRecipes,
        meal: getFavoriteRecipes.filter((recipe) => recipe.type === 'meal'),
        drink: getFavoriteRecipes.filter((recipe) => recipe.type === 'drink'),
      };
      setFavoriteRecipes(filters[filter]);
    }
  }, [filter]);

  return (
    <div>
      <Header />
      <Filters />

      {
        favoriteRecipes.map((recipe, i) => (
          <FavoriteRecipeCard key={ i } recipe={ recipe } index={ i } />
        ))
      }

    </div>
  );
}

export default FavoriteRecipes;
