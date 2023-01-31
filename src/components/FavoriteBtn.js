import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setStorage, getStorage } from '../services/Storage';
import recipesContext from '../context/RecipesContext';
import YHeart from '../images/YHeart.png';
import YEmptyHeart from '../images/YEmptyHeart.png';
import '../styles/FavoriteBtn.css';

function FavoriteBtn({ recipe, index }) {
  const { pathname } = useLocation();
  const { favoriteRecipes, setFavoriteRecipes } = useContext(recipesContext);

  const checkBtnClass = pathname.includes('drinks') || pathname.includes('meals');
  console.log(checkBtnClass);
  useEffect(() => {
    const favorite = getStorage('favoriteRecipes');
    setFavoriteRecipes(!favorite ? [] : favorite);
  }, []);

  const isAtFavoriteRecipesPage = pathname.includes('favorite-recipes');

  const id = () => {
    if (!isAtFavoriteRecipesPage) {
      const urlSplit = pathname.split('/');
      // ['', 'meals, drinks', 'id', 'in-progress']
      return urlSplit[2];
    }

    if (pathname.includes('favorite-recipes')) {
      return recipe.id;
    }

    return 1;
  };

  const isRecipeFavorite = [...favoriteRecipes]
    .some((favorite) => favorite.id === id());

  const removeRecipeToFavorite = () => {
    const removeFavorite = [...favoriteRecipes]
      .filter((favorite) => favorite.id !== id());
    console.log(removeFavorite);
    console.log('entrei aqui');
    setStorage('favoriteRecipes', removeFavorite);
    setFavoriteRecipes(removeFavorite);
  };

  const addRecipeToFavorite = () => {
    const addFavorite = [...favoriteRecipes,
      {
        id: pathname.includes('/meals') ? recipe.idMeal : recipe.idDrink,
        type: pathname.includes('/meals') ? 'meal' : 'drink',
        nationality: pathname.includes('/meals') ? recipe.strArea : '',
        category: recipe.strCategory,
        alcoholicOrNot: pathname.includes('/meals') ? '' : recipe.strAlcoholic,
        name: pathname.includes('/meals') ? recipe.strMeal : recipe.strDrink,
        image: pathname.includes('/meals') ? recipe.strMealThumb : recipe.strDrinkThumb,
      }];
    setStorage('favoriteRecipes', addFavorite);
    setFavoriteRecipes(addFavorite);
  };

  const handleClickFavoriteBtn = () => {
    if (isRecipeFavorite) {
      removeRecipeToFavorite();
    } else {
      addRecipeToFavorite();
    }
  };

  return (
    <div>
      {
        isAtFavoriteRecipesPage ? (
          <img
            aria-hidden="true"
            src={ YHeart }
            alt="blackHeartIcon"
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ removeRecipeToFavorite }
            className={ checkBtnClass ? 'favorite-btn' : 'favorite-btn-fav-done' }
          />
        ) : (
          <img
            aria-hidden="true"
            src={ isRecipeFavorite ? YHeart : YEmptyHeart }
            alt={ isRecipeFavorite ? 'blackHeartIcon' : 'whiteHeartIcon' }
            data-testid="favorite-btn"
            onClick={ handleClickFavoriteBtn }
            className={ checkBtnClass ? 'favorite-btn' : 'favorite-btn-fav-done' }
          />
        )
      }
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
    id: PropTypes.string,
    type: PropTypes.string,
    nationality: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default FavoriteBtn;
