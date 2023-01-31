import React, { useContext } from 'react';
import recipesContext from '../context/RecipesContext';
import '../styles/Filters.css';

function Filters() {
  const { setFilter } = useContext(recipesContext);

  const handleClick = ({ target: { value } }) => {
    setFilter(value);
  };

  return (
    <section className="filters-container">
      <button
        type="button"
        data-testid="filter-by-all-btn"
        value="all"
        onClick={ handleClick }
        className="filter-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        value="meal"
        onClick={ handleClick }
        className="filter-btn"
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        value="drink"
        onClick={ handleClick }
        className="filter-btn"
      >
        Drinks
      </button>
    </section>
  );
}

export default Filters;
