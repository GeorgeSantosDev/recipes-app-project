import React, { useContext, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { fetchDrinks, fetchMeals } from '../services/fetchRecipes';
import recipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import CategoriesFilters from '../components/CategoriesFilters';

const MAXIMUM_CARD = 11;

function Recipes() {
  const { recipesToRender,
    setRecipesToRender,
    setDrinksRecipes,
    setMealsRecipes } = useContext(recipesContext);

  const { pathname } = useLocation();

  const waysToGetRecipe = {
    '/meals': fetchMeals,
    '/drinks': fetchDrinks,
  };

  const waysToSaveAtGlobalStore = {
    '/meals': setMealsRecipes,
    '/drinks': setDrinksRecipes,
  };

  const getRecipes = async () => {
    const recipes = await waysToGetRecipe[pathname]();
    setRecipesToRender(!recipes ? [] : recipes);
    waysToSaveAtGlobalStore[pathname](!recipes ? [] : recipes);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const getFirstTwelveRecipes = recipesToRender.filter((_, i) => i <= MAXIMUM_CARD);

  return (
    <section>
      <Header />
      <CategoriesFilters />
      {
        getFirstTwelveRecipes.map((recipe, i) => (
          <Link
            to={ `${pathname}/${pathname === '/meals' ? recipe.idMeal : recipe.idDrink}` }
            key={ `Render-recipe-${i}` }
          >
            <RecipeCard
              recipe={ recipe }
              index={ i }
            />
          </Link>
        ))
      }
      <Footer />
    </section>
  );
}

export default Recipes;
