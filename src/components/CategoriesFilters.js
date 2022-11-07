import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchMealCategories, fetchDrinkCategories } from '../services/fetchCategories';
import { fetchMealByCategory,
  fetchDrinkByCategory } from '../services/fetchRecipesByCategory';
import recipesContext from '../context/RecipesContext';

const MAXIMUM_CATEGORIES = 4;

function CategoriesFilters() {
  const { setRecipesToRender, drinksRecipes, mealsRecipes } = useContext(recipesContext);
  const { pathname } = useLocation();

  const [categories, setCategories] = useState([]);
  const [isCategorySelected, setIsCategorySelected] = useState(false);

  const waysToGetCategory = {
    '/meals': fetchMealCategories,
    '/drinks': fetchDrinkCategories,
  };

  const waysToGetRecipesByCategory = {
    '/meals': fetchMealByCategory,
    '/drinks': fetchDrinkByCategory,
  };

  const getRecipesCategories = async () => {
    const recipesCategories = await waysToGetCategory[pathname]();
    setCategories(!recipesCategories ? [] : recipesCategories);
  };

  useEffect(() => {
    getRecipesCategories();
  }, []);

  const handleResetCategory = () => {
    setRecipesToRender(pathname === '/meals' ? mealsRecipes : drinksRecipes);
    setIsCategorySelected(false);
  };

  const handleClickFilterByCategory = async (category) => {
    if (isCategorySelected) {
      handleResetCategory();
    } else {
      const recipesByCategory = await waysToGetRecipesByCategory[pathname](category);
      setRecipesToRender(!recipesByCategory ? [] : recipesByCategory);
      setIsCategorySelected(true);
    }
  };

  const getFirstFiveCategories = categories.filter((_, i) => i <= MAXIMUM_CATEGORIES);

  return (
    <section>
      {
        getFirstFiveCategories.map((category, i) => (
          <button
            key={ `category-${i}` }
            type="button"
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => handleClickFilterByCategory(category.strCategory) }
          >
            {category.strCategory}
          </button>
        ))
      }
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ handleResetCategory }
      >
        All
      </button>
    </section>
  );
}

export default CategoriesFilters;
