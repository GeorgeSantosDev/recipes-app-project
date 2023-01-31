import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoriteBtn from './FavoriteBtn';
import ShareBtn from './ShareBtn';
import CheckboxInput from './CheckboxInput';
import '../styles/DetailsCard.css';

function DetailsCard({ recipe }) {
  const { pathname } = useLocation();
  const objectEntries = Object.entries(recipe);

  const checkPage = pathname.includes('meals');
  const isAtInProgressPage = pathname.includes('in-progress');

  const urlSplit = pathname.split('/');
  // ['', 'meals or drinks', 'id']

  const amountOfIngredients = objectEntries
    .filter((entrie) => entrie[0].includes('strIngredient') && entrie[1]);

  const amountOfMeasure = objectEntries
    .filter((measure) => measure[0].includes('strMeasure') && measure[1]);

  return (
    <div>
      <img
        src={ checkPage ? recipe.strMealThumb : recipe.strDrinkThumb }
        alt={ checkPage ? recipe.strMeal : recipe.strDrink }
        data-testid="recipe-photo"
        className="recipe-detail-image"
      />

      <ShareBtn
        type={ urlSplit[1] }
        id={ urlSplit[2] }
        datatest="share-btn"
        className="share-btn-recipe-detail"
      />

      <FavoriteBtn recipe={ recipe } />

      <h1 data-testid="recipe-title" className="recipe-detail-title">
        { checkPage ? recipe.strMeal : recipe.strDrink }
      </h1>

      {/* {
        checkPage ? <p data-testid="recipe-category">{recipe.strCategory}</p>
          : (
            <p data-testid="recipe-category">
              { `${recipe.strCategory} ${recipe.strAlcoholic}`}
            </p>
          )
      } */}

      <h2 className="ingredient-detail-title">Ingredients</h2>

      {
        isAtInProgressPage ? (
          amountOfIngredients.map((ingredient, i) => (
            <CheckboxInput
              key={ `ing-${i}` }
              ingredient={ ingredient }
              index={ i }
              amountOfMeasure={ amountOfMeasure }
            />
          ))
        ) : (
          <ul className="ingredient-list-container-detail">
            {
              amountOfIngredients.map((ingredient, i) => (
                <li
                  key={ `ing-${i}` }
                  data-testid={ `${i}-ingredient-name-and-measure` }
                  className="item-list-detail"
                >
                  {ingredient
                  && `${ingredient[1]}${amountOfMeasure[i]
                    ? `: ${amountOfMeasure[i][1]}` : ''}`}
                </li>
              ))
            }
          </ul>
        )
      }

      <h2 className="ingredient-detail-title">Instructions</h2>

      <p data-testid="instructions" className="description-detail">
        {recipe.strInstructions}
      </p>

      <h2 className="ingredient-detail-title">Video</h2>

      {
        checkPage && (
          <iframe
            title={ recipe.strMeal }
            width="100%"
            height="315"
            data-testid="video"
            src={ recipe.strYoutube }
          />
        )
      }
    </div>
  );
}

DetailsCard.propTypes = {
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

export default DetailsCard;
