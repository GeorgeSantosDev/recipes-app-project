import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareBtn from './ShareBtn';

function DoneRecipeCard({ recipe, index }) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/${recipe.type}s/${recipe.id}`);
  };

  return (
    <div>
      <input
        type="image"
        src={ recipe.image }
        alt={ recipe.name }
        data-testid={ `${index}-horizontal-image` }
        onClick={ handleClick }
      />

      <p data-testid={ `${index}-horizontal-top-text` }>
        { recipe.type === 'meal' ? `${recipe.nationality} - ${recipe.category}`
          : `${recipe.alcoholicOrNot} - ${recipe.category}` }
      </p>

      <Link
        to={ `/${recipe.type}s/${recipe.id}` }
        data-testid={ `${index}-horizontal-name` }
      >
        { recipe.name }
      </Link>

      <p data-testid={ `${index}-horizontal-done-date` }>
        { recipe.doneDate }
      </p>

      <ShareBtn
        type={ `${recipe.type}s` }
        id={ recipe.id }
        datatest={ `${index}-horizontal-share-btn` }
      />

      {
        recipe.tags.filter((tag, i) => i < 2 && (
          <p
            key={ tag }
            data-testid={ `${i}-${tag}-horizontal-tag` }
          >
            { tag }
          </p>
        ))
      }

    </div>
  );
}

DoneRecipeCard.propTypes = {
  recipe: PropTypes.shape(PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    nationality: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }))).isRequired,
  index: PropTypes.number.isRequired,
};

export default DoneRecipeCard;
