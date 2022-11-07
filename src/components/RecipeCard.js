import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function RecipeCard({ recipe, index }) {
  const { pathname } = useLocation();

  const isAtMealsRoute = pathname.includes('meals');

  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        src={ isAtMealsRoute ? recipe.strMealThumb : recipe.strDrinkThumb }
        alt={ isAtMealsRoute ? recipe.strMeal : recipe.strDrink }
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>
        { isAtMealsRoute ? recipe.strMeal : recipe.strDrink }
      </p>
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
