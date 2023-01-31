import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { setStorage, getStorage } from '../services/Storage';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import recipesContext from '../context/RecipesContext';

function FavoriteBtnPage({ recipe, index }) {
  const { favoriteRecipes, setFavoriteRecipes } = useContext(recipesContext);

  useEffect(() => {
    setFavoriteRecipes(getStorage('favoriteRecipes'));
  }, []);

  const handleClickFavoriteBtn = () => {
    const removeFavorite = [...favoriteRecipes]
      .filter((favorite) => favorite.id !== recipe.id);

    setStorage('favoriteRecipes', removeFavorite);
    setFavoriteRecipes(removeFavorite);
  };

  return (
    <div>
      <img
        aria-hidden="true"
        src={ blackHeartIcon }
        alt="blackHeartIcon"
        data-testid={ `${index}-horizontal-favorite-btn` }
        onClick={ handleClickFavoriteBtn }
      />
    </div>
  );
}

FavoriteBtnPage.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string,

  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default FavoriteBtnPage;
