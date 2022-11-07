import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareBtn from './ShareBtn';
import FavoriteBtn from './FavoriteBtn';

function FavoriteRecipeCard({ recipe, index }) {
  return (
    <div>
      <Link
        to={ `/${recipe.type}s/${recipe.id}` }
      >
        <img
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>

      <p data-testid={ `${index}-horizontal-top-text` }>
        { recipe.type === 'meal' ? `${recipe.nationality} - ${recipe.category}`
          : `${recipe.alcoholicOrNot} - ${recipe.category}` }
      </p>

      <Link to={ `/${recipe.type}s/${recipe.id}` }>
        <p
          data-testid={ `${index}-horizontal-name` }
        >
          { recipe.name }
        </p>
      </Link>

      <ShareBtn
        type={ `${recipe.type}s` }
        id={ recipe.id }
        datatest={ `${index}-horizontal-share-btn` }
      />
      <FavoriteBtn recipe={ recipe } index={ index } />

    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  recipe: PropTypes.shape(PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    nationality: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
  }))).isRequired,
  index: PropTypes.number.isRequired,
};

export default FavoriteRecipeCard;
