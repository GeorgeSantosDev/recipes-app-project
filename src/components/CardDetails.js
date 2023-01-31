import React from 'react';
import PropTypes from 'prop-types';
import FavoriteBtn from './FavoriteBtn';
import ShareBtn from './ShareBtn';

function CardDetails({ recipe, pathname }) {
  const objectEntries = Object.entries(recipe);

  return (
    <div>
      {
        pathname.includes('meals') ? (
          <div>
            <img
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
              data-testid="recipe-photo"
            />
            <ShareBtn />
            <FavoriteBtn recipe={ recipe } />
            <h1 data-testid="recipe-title">{ recipe.strMeal }</h1>
            <p data-testid="recipe-category">{recipe.strCategory}</p>
            <ul>
              {
                objectEntries
                  .filter((entrie) => entrie[0].includes('strIngredient') && entrie[1])
                  .map((ingredient, i) => (
                    <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                      {ingredient && `${ingredient[1]}: ${objectEntries
                        .filter((measure) => (
                          measure[0].includes('strMeasure') && measure[1]
                        ))[i]}`}
                    </li>
                  ))
              }
            </ul>
            <p data-testid="instructions">{recipe.strInstructions}</p>
            <iframe
              title={ recipe.strMeal }
              width="420"
              height="315"
              data-testid="video"
              src={ recipe.strYoutube }
            />
          </div>
        ) : (
          <div>
            <img
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
              data-testid="recipe-photo"
            />
            <ShareBtn />
            <FavoriteBtn recipe={ recipe } />
            <h1 data-testid="recipe-title">{ recipe.strDrink }</h1>
            <p data-testid="recipe-category">
              {
                `${recipe.strCategory} ${recipe.strAlcoholic}`
              }
            </p>
            <ul>
              {

                objectEntries
                  .filter((entrie) => entrie[0].includes('strIngredient') && entrie[1])
                  .map((ingredient, i) => (
                    <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                      {ingredient && `${ingredient[1]}: ${objectEntries
                        .filter((amount) => (
                          amount[0].includes('strMeasure') && amount[1] !== undefined
                        ))[i][1]}`}
                    </li>
                  ))
              }
            </ul>
            <p data-testid="instructions">{recipe.strInstructions}</p>
          </div>
        )
      }
    </div>
  );
}

CardDetails.propTypes = {
  pathname: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strYoutube: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
    strAlcoholic: PropTypes.string,
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
  }).isRequired,
};

export default CardDetails;
