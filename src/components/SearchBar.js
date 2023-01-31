import React, { useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import recipesContext from '../context/RecipesContext';
import { fetchMealsByIngredient,
  fetchMealsByName,
  fetchMealsByLetter } from '../services/fetchMealsFilters';
import { fetchDrinksByIngredient,
  fetchDrinksByName,
  fetchDrinksByLetter } from '../services/fetchDrinksFilters';
import '../styles/SearchBar.css';

function SearchBar() {
  const [filterSelected, setFilterSelected] = useState('');
  const [search, setSearch] = useState('');

  const { pathname } = useLocation();
  const history = useHistory();
  const { setRecipesToRender } = useContext(recipesContext);

  const setFilter = (filter) => setFilterSelected(filter);

  const alertReturn = (kindOfAlert) => {
    if (kindOfAlert === 'NotFound') {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      setRecipesToRender([]);
      return [];
    }
    if (kindOfAlert === 'More than one letter') {
      global.alert('Your search must have only 1 (one) character');
      setRecipesToRender([]);
      return [];
    }
  };

  const mealsFilters = {
    ingredient: fetchMealsByIngredient,
    name: fetchMealsByName,
    letter: fetchMealsByLetter,
  };

  const drinksFilters = {
    ingredient: fetchDrinksByIngredient,
    name: fetchDrinksByName,
    letter: fetchDrinksByLetter,
  };

  const isValidLetterFilter = filterSelected === 'letter' && search.length === 1;
  const isNameOrIngredientSelected = filterSelected === 'name'
    || filterSelected === 'ingredient';

  const actionJustOneRecipeWasReturned = (array) => {
    const ids = {
      '/meals': 'idMeal',
      '/drinks': 'idDrink',
    };
    if (array.length === 1) {
      history.push(`${pathname}/${array[0][ids[pathname]]}`);
    }
  };

  const actionFilterMeals = async () => {
    const meals = await mealsFilters[filterSelected](search);

    setRecipesToRender(!meals ? [] : meals);
    actionJustOneRecipeWasReturned(!meals ? [] : meals);
    return !meals ? alertReturn('NotFound') : meals;
  };

  const actionFilterDrinks = async () => {
    const drinks = await drinksFilters[filterSelected](search);
    setRecipesToRender(!drinks ? [] : drinks);
    actionJustOneRecipeWasReturned(!drinks ? [] : drinks);
    return !drinks ? alertReturn('NotFound') : drinks;
  };

  const actionsToFilter = {
    '/meals': actionFilterMeals,
    '/drinks': actionFilterDrinks,
  };

  const handleSearch = () => {
    if (isValidLetterFilter || isNameOrIngredientSelected) {
      return actionsToFilter[pathname]();
    }

    return alertReturn('More than one letter');
  };

  return (
    <form className="container-flex-collumn form-search-bar">
      <label htmlFor="search">
        <input
          type="text"
          id="search"
          data-testid="search-input"
          placeholder="Search Recipes"
          className="search-input"
          value={ search }
          onChange={ ({ target: { value } }) => setSearch(value) }
        />
      </label>

      <div className="search-radios-inputs-container">
        <label htmlFor="ingredient">
          Ingredient
          <input
            type="radio"
            id="ingredient"
            value="ingredient"
            checked={ filterSelected === 'ingredient' }
            data-testid="ingredient-search-radio"
            onChange={ () => { setFilter('ingredient'); } }
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="radio"
            id="name"
            value="name"
            checked={ filterSelected === 'name' }
            data-testid="name-search-radio"
            onChange={ () => { setFilter('name'); } }
          />
        </label>
        <label htmlFor="first-letter">
          First Letter
          <input
            type="radio"
            id="first-letter"
            value="letter"
            checked={ filterSelected === 'letter' }
            data-testid="first-letter-search-radio"
            onChange={ () => { setFilter('letter'); } }
          />
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearch }
        className="search-btn"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
