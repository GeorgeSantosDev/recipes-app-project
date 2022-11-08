import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchMealCategories, fetchDrinkCategories } from '../services/fetchCategories';
import { fetchMealByCategory,
  fetchDrinkByCategory } from '../services/fetchRecipesByCategory';
import recipesContext from '../context/RecipesContext';
import all from '../images/All.png';
import beef from '../images/beef.png';
import chicken from '../images/chicken.png';
import breakfast from '../images/breakfast.png';
import dessert from '../images/dessert.png';
import goat from '../images/goat.png';
import alldrinks from '../images/alldrinks.png';
import cocktail from '../images/cocktail.png';
import cocoa from '../images/cocoa.png';
import drinksIcon from '../images/drinksIcon.png';
import shake from '../images/shake.png';
import other from '../images/other.png';
import '../styles/CategoriesFilters.css';

const categoriesIcons = {
  '/meals': [beef, breakfast, chicken, dessert, goat, all],
  '/drinks': [drinksIcon, cocktail, shake, other, cocoa, alldrinks],
};

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
    <section className="categories-container">
      {
        getFirstFiveCategories.map((category, i) => (
          <img
            key={ `category-${i}` }
            aria-hidden="true"
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => handleClickFilterByCategory(category.strCategory) }
            src={ categoriesIcons[pathname][i] }
            alt="category-Icon"
          />
        ))
      }
      <img
        data-testid="All-category-filter"
        aria-hidden="true"
        type="button"
        onClick={ handleResetCategory }
        src={ categoriesIcons[pathname][5] }
        alt="category-Icon"
      />
    </section>
  );
}

export default CategoriesFilters;
