import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Card from '../components/Card';
import recipesContext from '../context/RecipesContext';
import fetchMeals from '../services/fetchMeals';
import fetchDrinks from '../services/fetchDrinks';
import CategoriesFilters from '../components/CategoriesFilter';

const MAXIMUM_CARD = 11;

function Recipes() {
  const { pathname } = useLocation();
  const {
    recipesToRender,
    setRecipesToRender,
    setDrinks,
    setMeals,
  } = useContext(recipesContext);

  const requisitions = async () => {
    const meals = await fetchMeals();
    const drinks = await fetchDrinks();
    if (pathname === '/meals') {
      setRecipesToRender(meals);
    } else {
      setRecipesToRender(drinks);
    }
    setDrinks(drinks);
    setMeals(meals);
  };

  useEffect(() => {
    requisitions();
  }, [pathname]);

  return (
    <div>
      <Header page={ pathname } search />
      <CategoriesFilters />
      {
        recipesToRender.filter((_recipe, i) => i <= MAXIMUM_CARD)
          .map((recipe, i) => {
            if (pathname === '/meals') {
              return (
                <Link
                  key={ `${i}-${recipe.strMeal}` }
                  to={ `/meals/${recipe.idMeal}` }
                >
                  <Card
                    image={ recipe.strMealThumb }
                    name={ recipe.strMeal }
                    index={ i }
                  />
                </Link>
              );
            }
            return (
              <Link
                key={ `${i}-${recipe.strDrink}` }
                to={ `/drinks/${recipe.idDrink}` }
              >
                <Card
                  image={ recipe.strDrinkThumb }
                  name={ recipe.strDrink }
                  index={ i }
                />
              </Link>
            );
          })
      }
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Recipes;
