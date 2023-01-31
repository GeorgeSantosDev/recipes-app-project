import React, { useState } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import '../styles/DoneRecipes.css';

function DoneRecipesInfo({ doneRecipes }) {
  const history = useHistory();
  const [copyMessage, setCopyMessage] = useState(false);

  const filterTags = (tags) => tags.filter((_tag, ind) => ind < 2);

  const tagsMap = (tags, ind) => filterTags(tags).map((tag) => (
    <p
      key={ tag }
      data-testid={ `${ind}-${tag}-horizontal-tag` }
    >
      {tag}
    </p>
  ));

  const clickToRecipeDetails = (type, idRecipe) => {
    if (type === 'meal') {
      history.push(`/meals/${idRecipe}`);
    } else {
      history.push(`/drinks/${idRecipe}`);
    }
  };

  const copyRecipe = (type, idCopy) => {
    if (type === 'meal') {
      copy(`http://localhost:3000/meals/${idCopy}`);
    } else {
      copy(`http://localhost:3000/drinks/${idCopy}`);
    }
    setCopyMessage(true);
  };

  return (
    <div>
      {
        doneRecipes.map(({
          type,
          image,
          category,
          name,
          doneDate,
          nationality,
          alcoholicOrNot,
          id,
          tags,
        }, index) => (
          <div key={ `${id}-${index}` }>
            <input
              className="image-done-recipes"
              type="image"
              src={ image }
              alt={ name }
              data-testid={ `${index}-horizontal-image` }
              onClick={ () => clickToRecipeDetails(type, id) }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>
              {type === 'meal' ? `${nationality} - ${category}`
                : `${alcoholicOrNot} - ${category}`}
            </p>
            <div
              role="presentation"
              data-testid={ `${index}-horizontal-name` }
              onClick={ () => clickToRecipeDetails(type, id) }
            >
              {name}
            </div>
            <p data-testid={ `${index}-horizontal-done-date` }>
              {doneDate}
            </p>
            <input
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="shareIcon"
              onClick={ () => copyRecipe(type, id) }
            />
            {tagsMap(tags, index)}
            { copyMessage && <span>Link copied!</span> }
          </div>
        ))
      }
    </div>
  );
}

DoneRecipesInfo.propTypes = {
  doneRecipes: PropTypes.arrayOf(PropTypes.shape()).isRequired };

export default DoneRecipesInfo;
