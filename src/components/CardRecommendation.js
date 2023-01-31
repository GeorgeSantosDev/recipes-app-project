import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import PropTypes from 'prop-types';

function CardRecommendation({ index, pathname, sugestion }) {
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
        <p data-testid={ `${index}-recommendation-title` }>
          { pathname.includes('meals') ? sugestion.strDrink
            : sugestion.strMeal }
        </p>
      </Carousel.Caption>
    </Carousel.Item>
  );
}

CardRecommendation.propTypes = {
  index: PropTypes.number.isRequired,
  pathname: PropTypes.string.isRequired,
  sugestion: PropTypes.shape({
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
};

export default CardRecommendation;
