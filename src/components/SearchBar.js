import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchMealsByIngredient,
  fetchMealsByName,
  fetchMealsByLetter } from '../services/fetchMealsFilters';
import { fetchDrinksByIngredient,
  fetchDrinksByName,
  fetchDrinksByLetter } from '../services/fetchDrinksFilter';
import recipesContext from '../context/RecipesContext';

function SearchBar({ page }) {
  const history = useHistory();
  const { setRecipesToRender, setIsFilter, setWhatIsRender } = useContext(recipesContext);
  const [filterSelected, setFilterSelected] = useState('');
  const [search, setSearch] = useState('');

  const alertReturn = () => {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
    return [];
  };

  const chooseMealsFilter = async () => {
    if (filterSelected === 'ingredient') {
      const meals = await fetchMealsByIngredient(search);
      const mealsReturn = !meals ? alertReturn() : meals;
      return mealsReturn;
    }
    if (filterSelected === 'name') {
      const meals = await fetchMealsByName(search);
      const mealsReturn = !meals ? alertReturn() : meals;
      return mealsReturn;
    }
    if (filterSelected === 'letter' && search.length === 1) {
      const meals = await fetchMealsByLetter(search);
      const mealsReturn = !meals ? alertReturn() : meals;
      return mealsReturn;
    }
    global.alert('Your search must have only 1 (one) character');
    return [];
  };

  const chooseDrinksFilter = async () => {
    if (filterSelected === 'ingredient') {
      const drinks = await fetchDrinksByIngredient(search);
      const drinksReturn = !drinks ? alertReturn() : drinks;
      return drinksReturn;
    }
    if (filterSelected === 'name') {
      const drinks = await fetchDrinksByName(search);
      const drinksReturn = !drinks ? alertReturn() : drinks;
      return drinksReturn;
    }
    if (filterSelected === 'letter' && search.length === 1) {
      const drinks = await fetchDrinksByLetter(search);
      const drinksReturn = !drinks ? alertReturn() : drinks;
      return drinksReturn;
    }

    global.alert('Your search must have only 1 (one) character');
    return [];
  };

  const redirectToDetails = (array) => {
    if (array.length === 1) {
      const ways = {
        '/meals': `/meals/${array[0].idMeal}`,
        '/drinks': `/drinks/${array[0].idDrink}`,
      };

      history.push(ways[page]);
    }
  };

  const handleSearch = async () => {
    if (page === '/meals') {
      const meals = await chooseMealsFilter();
      setRecipesToRender(meals);
      setIsFilter((prev) => !prev);
      setWhatIsRender('meals');
      redirectToDetails(meals);
    }
    if (page === '/drinks') {
      const drinks = await chooseDrinksFilter();
      setRecipesToRender(drinks);
      setIsFilter((prev) => !prev);
      setWhatIsRender('drink');
      redirectToDetails(drinks);
    }
  };

  return (
    <form>
      <label htmlFor="search">
        <input
          type="text"
          id="search"
          data-testid="search-input"
          placeholder="Search Recipes"
          value={ search }
          onChange={ ({ target: { value } }) => setSearch(value) }
        />
      </label>
      <label htmlFor="ingredient">
        <input
          type="radio"
          id="ingredient"
          value="ingredient"
          checked={ filterSelected === 'ingredient' }
          data-testid="ingredient-search-radio"
          onChange={ () => { setFilterSelected('ingredient'); } }
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          id="name"
          value="name"
          checked={ filterSelected === 'name' }
          data-testid="name-search-radio"
          onChange={ () => { setFilterSelected('name'); } }
        />
        Name
      </label>
      <label htmlFor="first-letter">
        <input
          type="radio"
          id="first-letter"
          value="letter"
          checked={ filterSelected === 'letter' }
          data-testid="first-letter-search-radio"
          onChange={ () => { setFilterSelected('letter'); } }
        />
        First Letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearch }
      >
        Search
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  page: PropTypes.string.isRequired,
};

export default SearchBar;
