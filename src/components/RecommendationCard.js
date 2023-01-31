import React from 'react';
import { useLocation } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import PropTypes from 'prop-types';
import '../styles/RecommendationCard.css';

function RecommendationCard({ index, sugestion }) {
  const { pathname } = useLocation();

  return (
    <Carousel.Item
      data-testid={ `${index}-recommendation-card` }
    >
      <img
        className="carousel-image"
        src={ pathname.includes('meals') ? sugestion.strDrinkThumb
          : sugestion.strMealThumb }
        alt={ pathname.includes('meals') ? sugestion.strDrink
          : sugestion.strMeal }
      />
      <Carousel.Caption>
        <p
          data-testid={ `${index}-recommendation-title` }
          className="recommend-recipe-name"
        >
          { pathname.includes('meals') ? sugestion.strDrink
            : sugestion.strMeal }
        </p>
      </Carousel.Caption>
    </Carousel.Item>
  );
}

RecommendationCard.propTypes = {
  index: PropTypes.number.isRequired,
  sugestion: PropTypes.shape({
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
};

export default RecommendationCard;
