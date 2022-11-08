import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/RecipeCard.css';

function RecipeCard({ recipe, index }) {
  const { pathname } = useLocation();

  const isAtMealsRoute = pathname.includes('meals');

  return (
    <div data-testid={ `${index}-recipe-card` } className="recipe-card-container">
      <img
        src={ isAtMealsRoute ? recipe.strMealThumb : recipe.strDrinkThumb }
        alt={ isAtMealsRoute ? recipe.strMeal : recipe.strDrink }
        data-testid={ `${index}-card-img` }
        className="recipe-image"
      />
      <p data-testid={ `${index}-card-name` } className="recipe-name">
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
