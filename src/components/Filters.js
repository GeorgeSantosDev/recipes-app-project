import React, { useContext } from 'react';
import recipesContext from '../context/RecipesContext';

function Filters() {
  const { setFilter } = useContext(recipesContext);

  const handleClick = ({ target: { value } }) => {
    setFilter(value);
  };

  return (
    <section>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        value="all"
        onClick={ handleClick }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        value="meal"
        onClick={ handleClick }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        value="drink"
        onClick={ handleClick }
      >
        Drinks
      </button>
    </section>
  );
}

export default Filters;
