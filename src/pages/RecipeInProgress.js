import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { fetchMealsDetails, fetchDrinksDetails } from '../services/fetchDetails';
import DetailsCard from '../components/DetailsCard';
import { getStorage, setStorage } from '../services/Storage';
import recipesContext from '../context/RecipesContext';

function RecipeInProgress() {
  const { pathname } = useLocation();
  const history = useHistory();
  const { ingredientCheck } = useContext(recipesContext);

  const urlSplit = pathname.split('/');
  // ['', 'meals or drinks', 'id', 'in-progress']

  const [recipeDetails, setRecipeDetails] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const waysToDetails = {
    meals: fetchMealsDetails,
    drinks: fetchDrinksDetails,
  };

  const getDetails = async () => {
    const details = await waysToDetails[urlSplit[1]](urlSplit[2]);
    setRecipeDetails(!details ? [] : details);
  };

  const isAllChecked = () => {
    const allIngredients = recipeDetails[0] ? Object.entries(recipeDetails[0])
      .filter((entrie) => entrie[0]
        .includes('strIngredient') && entrie[1]) : [];

    const recipeInProgress = getStorage('inProgressRecipes');

    let ingredientsToCheck = [];

    if (recipeInProgress
        && recipeInProgress[urlSplit[1]]
        && recipeInProgress[urlSplit[1]][urlSplit[2]]) {
      ingredientsToCheck = recipeInProgress[urlSplit[1]][urlSplit[2]];
    }

    setIsDisabled(!allIngredients
      .every((ingredient) => ingredientsToCheck.includes(ingredient[1])));
  };

  useEffect(() => {
    isAllChecked();
  }, [ingredientCheck]);

  useEffect(() => {
    getDetails();
  }, []);

  const handleClickFinishRecipe = () => {
    const getDoneRecipes = !getStorage('doneRecipes') ? [] : getStorage('doneRecipes');
    const arrayOfTags = recipeDetails[0].strTags ? recipeDetails[0].strTags.split(',')
      : [];

    const newDoneRecipe = [...getDoneRecipes, {
      id: urlSplit[1] === 'meals' ? recipeDetails[0].idMeal : recipeDetails[0].idDrink,
      type: urlSplit[1] === 'meals' ? 'meal' : 'drink',
      nationality: urlSplit[1] === 'meals' ? recipeDetails[0].strArea : '',
      category: urlSplit[1] === 'meals' ? recipeDetails[0].strCategory : '',
      alcoholicOrNot: urlSplit[1] === 'meals' ? '' : '',
      name: urlSplit[1] === 'meals' ? recipeDetails[0].strMeal
        : recipeDetails[0].strDrink,
      image: urlSplit[1] === 'meals' ? recipeDetails[0].strMealThumb
        : recipeDetails[0].strDrinkThumb,
      doneDate: new Date(),
      tags: urlSplit[1] === 'meals' ? arrayOfTags : [],
    }];

    setStorage('doneRecipes', newDoneRecipe);
    history.push('/done-recipes');
  };

  return (
    <section>
      {
        recipeDetails.map((details, i) => (
          <DetailsCard
            key={ `${i}-${pathname}` }
            recipe={ details }
          />
        ))
      }
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ isDisabled }
        onClick={ handleClickFinishRecipe }
      >
        Finish Recipe
      </button>
    </section>
  );
}

export default RecipeInProgress;
