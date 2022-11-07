import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { getStorage } from '../services/Storage';
import { fetchMealsRecommendation,
  fetchDrinksRecommendation } from '../services/fetchRecommendation';
import { fetchMealsDetails, fetchDrinksDetails } from '../services/fetchDetails';
import DetailsCard from '../components/DetailsCard';
import RecommendationCard from '../components/RecommendationCard';
import '../styles/RecipeDetails.css';

const LIMIT_OF_INDEX_RECOMMENDATION = 5;

function RecipeDetails() {
  const { pathname } = useLocation();
  const history = useHistory();

  const urlSplit = pathname.split('/');
  // ['', 'meals or drinks', 'id']

  const [recipeDetails, setRecipeDetails] = useState([]);
  const [recommendationRecipes, setRecommendationRecipes] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [recipesInProgress, setRecipesInProgress] = useState([]);

  const waysToDetails = {
    meals: fetchMealsDetails,
    drinks: fetchDrinksDetails,
  };

  const waysToRecommendation = {
    meals: fetchDrinksRecommendation,
    drinks: fetchMealsRecommendation,
  };

  const getDetails = async () => {
    const details = await waysToDetails[urlSplit[1]](urlSplit[2]);
    setRecipeDetails(!details ? [] : details);
  };

  const getRecommendation = async () => {
    const recommendation = await waysToRecommendation[urlSplit[1]]();
    setRecommendationRecipes(!recommendation ? [] : recommendation);
  };

  const getDoneRecipesAndRecipesInProgressFromStorage = () => {
    const done = getStorage('doneRecipes');
    const inProgress = getStorage('inProgressRecipes');
    setDoneRecipes(!done ? [] : done);
    setRecipesInProgress(!inProgress ? [] : inProgress);
  };

  useEffect(() => {
    getDoneRecipesAndRecipesInProgressFromStorage();
    getDetails();
    getRecommendation();
  }, []);

  const sixRecommendations = recommendationRecipes
    .filter((_, i) => i <= LIMIT_OF_INDEX_RECOMMENDATION);

  const haveRecipeAlreadyDone = doneRecipes.some(({ id }) => id === urlSplit[2]);

  const haveRecipeAlreadyStarted = recipesInProgress[urlSplit[1]]
    && recipesInProgress[urlSplit[1]][urlSplit[2]];

  const handleClickStartRecipeBtn = () => {
    history.push(`${pathname}/in-progress`);
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

      <h2>Recommended</h2>

      <Carousel>
        {
          sixRecommendations.map((sugestion, i) => (
            <RecommendationCard
              key={ `recommendation-${i}` }
              index={ i }
              sugestion={ sugestion }
            />
          ))
        }
      </Carousel>

      {
        !haveRecipeAlreadyDone && (
          <button
            className="start-recipe-btn"
            data-testid="start-recipe-btn"
            type="button"
            onClick={ handleClickStartRecipeBtn }
          >
            {
              haveRecipeAlreadyStarted ? 'Continue Recipe' : 'Start Recipe'
            }
          </button>
        )
      }
    </section>
  );
}

export default RecipeDetails;
