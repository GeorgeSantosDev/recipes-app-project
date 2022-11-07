import React, { useState, useEffect, useContext } from 'react';
import { getStorage } from '../services/Storage';
import recipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Filters from '../components/Filters';
import DoneRecipeCard from '../components/DoneRecipeCard';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const { filter } = useContext(recipesContext);

  const getDoneRecipes = getStorage('doneRecipes');

  useEffect(() => {
    if (getDoneRecipes) {
      setDoneRecipes(getDoneRecipes);
    }
  }, []);

  useEffect(() => {
    if (getDoneRecipes) {
      const filters = {
        all: getDoneRecipes,
        meal: getDoneRecipes.filter((recipe) => recipe.type === 'meal'),
        drink: getDoneRecipes.filter((recipe) => recipe.type === 'drink'),
      };
      setDoneRecipes(filters[filter]);
    }
  }, [filter]);

  console.log(doneRecipes);

  return (
    <div>
      <Header />
      <Filters />

      {
        doneRecipes.map((recipe, i) => (
          <DoneRecipeCard key={ `${recipe.name}-${i}` } recipe={ recipe } index={ i } />
        ))
      }
    </div>
  );
}

export default DoneRecipes;
