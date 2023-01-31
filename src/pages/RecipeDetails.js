import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useLocation, useHistory } from 'react-router-dom';
import CardDetails from '../components/CardDetails';
import CardRecommendation from '../components/CardRecommendation';
import { getStorage } from '../services/Storage';
import { fetchDetailsDrinks, fetchDetailsMeals } from '../services/fetchDetails';
import { fetchDrinksRecommendation,
  fetchMealsRecommendation } from '../services/fetchRecommendation';
import '../styles/RecipeDetails.css';

const LIMIT_OF_RECOMMENDATION = 5;

function RecipeDetails() {
  const { pathname } = useLocation();
  const history = useHistory();

  const [recipeDetails, setRecipeDetails] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [recipesInProgress, setRecipesInProgress] = useState({});

  const urlSplit = pathname.split('/');

  const fetchDetail = async () => {
    setDoneRecipes(getStorage('doneRecipes'));
    setRecipesInProgress(getStorage('inProgressRecipes'));

    if (pathname.includes('meals')) {
      const mealDetails = await fetchDetailsMeals(urlSplit[2]);
      const drinksRecommendation = await fetchDrinksRecommendation();
      setRecipeDetails(mealDetails);
      setRecommendation(drinksRecommendation);
    } else {
      const drinkDetails = await fetchDetailsDrinks(urlSplit[2]);
      const mealsRecommendation = await fetchMealsRecommendation();
      setRecipeDetails(drinkDetails);
      setRecommendation(mealsRecommendation);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  const handleClickStartRecipeBtn = () => {
    history.push(`${pathname}/in-progress`);
  };

  return (
    <section>
      {
        recipeDetails && recipeDetails.map((details, i) => (
          <CardDetails
            key={ `${i}-${pathname}` }
            recipe={ details }
            pathname={ pathname }
          />
        ))
      }
      <h1>Recommended</h1>
      <Carousel>
        {
          recommendation && recommendation.filter((_, i) => i <= LIMIT_OF_RECOMMENDATION)
            .map((sugestion, index) => (
              <CardRecommendation
                index={ index }
                sugestion={ sugestion }
                pathname={ pathname }
                key={ `recommendation-${index}` }
              />
            ))
        }
      </Carousel>
      {
        !doneRecipes.some(({ id }) => id === urlSplit[2]) && (
          <button
            className="start-recipe-btn"
            data-testid="start-recipe-btn"
            type="button"
            onClick={ handleClickStartRecipeBtn }
          >
            {
              recipesInProgress[urlSplit[1]]
              && recipesInProgress[urlSplit[1]][urlSplit[2]]
                ? 'Continue Recipe'
                : 'Start Recipe'
            }
          </button>
        )
      }
    </section>
  );
}

export default RecipeDetails;
