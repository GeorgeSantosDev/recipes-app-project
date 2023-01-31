import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setStorage, getStorage } from '../services/Storage';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteBtn({ recipe }) {
  const { pathname } = useLocation();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    setFavoriteRecipes(getStorage('favoriteRecipes'));
  }, []);

  const id = pathname.includes('/meals') ? recipe.idMeal : recipe.idDrink;
  const isFavorite = [...favoriteRecipes]
    .some((favorite) => favorite.id === id);

  const handleClickFavoriteBtn = () => {
    const addNewFavorite = [...favoriteRecipes,
      {
        id: pathname.includes('/meals') ? recipe.idMeal : recipe.idDrink,
        type: pathname.includes('/meals') ? 'meal' : 'drink',
        nationality: pathname.includes('/meals') ? recipe.strArea : '',
        category: recipe.strCategory,
        alcoholicOrNot: pathname.includes('/meals') ? '' : recipe.strAlcoholic,
        name: pathname.includes('/meals') ? recipe.strMeal : recipe.strDrink,
        image: pathname.includes('/meals') ? recipe.strMealThumb : recipe.strDrinkThumb,
      }];

    const removeFavorite = [...favoriteRecipes].filter((favorite) => favorite.id !== id);

    if (isFavorite) {
      setStorage('favoriteRecipes', removeFavorite);
      setFavoriteRecipes(removeFavorite);
    } else {
      setStorage('favoriteRecipes', addNewFavorite);
      setFavoriteRecipes(addNewFavorite);
    }
  };

  return (
    <div>
      <img
        aria-hidden="true"
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt={ isFavorite ? 'blackHeartIcon' : 'whiteHeartIcon' }
        data-testid="favorite-btn"
        onClick={ handleClickFavoriteBtn }
      />
    </div>
  );
}

FavoriteBtn.propTypes = {
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

export default FavoriteBtn;
