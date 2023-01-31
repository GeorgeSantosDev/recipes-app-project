import React, { useState } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import FavoriteBtnPage from './FavoriteBtnPage';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipesInfo({ favoriteRecipes, index }) {
  const history = useHistory();
  const [copyMessage, setCopyMessage] = useState(false);
  // const filterTags = (tags) => tags.filter((_tag, ind) => ind < 2);

  // const tagsMap = (tags, ind) => filterTags(tags).map((tag) => (
  //   <p
  //     key={ tag }
  //     data-testid={ `${ind}-${tag}-horizontal-tag` }
  //   >
  //     {tag}
  //   </p>
  // ));

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

      <div>
        <img
          src={ favoriteRecipes.image }
          alt={ favoriteRecipes.name }
          data-testid={ `${index}-horizontal-image` }
          // onClick={ () => clickToRecipeDetails(type, id) }
        />
        <p data-testid={ `${index}-horizontal-top-text` }>
          {favoriteRecipes.type === 'meal'
            ? `${favoriteRecipes.nationality} - ${favoriteRecipes.category}`
            : `${favoriteRecipes.alcoholicOrNot} - ${favoriteRecipes.category}`}
        </p>
        <div
          role="presentation"
          data-testid={ `${index}-horizontal-name` }
          onClick={ () => clickToRecipeDetails(favoriteRecipes.type, favoriteRecipes.id) }
        >
          {favoriteRecipes.name}
        </div>
        <input
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="shareIcon"
          onClick={ () => copyRecipe(favoriteRecipes.type, favoriteRecipes.id) }
        />
        {/* {tagsMap(favoriteRecipes.tags, index)} */}
        { copyMessage && <span>Link copied!</span> }
        <FavoriteBtnPage
          recipe={ favoriteRecipes }
          index={ index }

        />
      </div>

    </div>
  );
}

FavoriteRecipesInfo.propTypes = {
  favoriteRecipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  index: PropTypes.number.isRequired,
};

export default FavoriteRecipesInfo;
