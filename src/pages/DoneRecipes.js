import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getStorage } from '../services/Storage';
import DoneRecipesInfo from '../components/DoneRecipesInfo';

function DoneRecipes({ location: { pathname } }) {
  const [filter, setFilter] = useState('all');

  const onClickChange = (event) => {
    setFilter(event.target.value);
  };

  const doneRecipes = getStorage('doneRecipes');

  const filterRecipes = doneRecipes
    .filter(({ type }) => filter === 'all' || type === filter);

  return (
    <div>
      <Header page={ pathname } search={ false } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        value="all"
        onClick={ onClickChange }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        value="meal"
        onClick={ onClickChange }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        value="drink"
        onClick={ onClickChange }
      >
        Drinks
      </button>
      <DoneRecipesInfo doneRecipes={ filterRecipes } />
    </div>
  );
}
DoneRecipes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
export default DoneRecipes;
