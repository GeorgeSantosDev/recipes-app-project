import React from 'react';
import PropTypes from 'prop-types';

function Card({ image, name, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img src={ image } alt={ name } data-testid={ `${index}-card-img` } />
      <p data-testid={ `${index}-card-name` }>{name}</p>
    </div>
  );
}

Card.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
};

export default Card;
