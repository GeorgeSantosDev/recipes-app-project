import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getStorage } from '../services/Storage';
import FavoriteRecipesInfo from '../components/FavoriteRecipesInfo';
import recipesContext from '../context/RecipesContext';

function FavoriteRecipes({ location: { pathname } }) {
  const { favoriteRecipes, setFavoriteRecipes } = useContext(recipesContext);
  // const [filter, setFilter] = useState('all');

  // const favoriteRecipess = getStorage('favoriteRecipes');

  useEffect(() => {
    console.log(getStorage('favoriteRecipes'));
    setFavoriteRecipes(getStorage('favoriteRecipes'));
  }, []);
  // const filterRecipes = favoriteRecipes
  //   .filter(({ type }) => filter === 'all' || type === filter);

  const onClickChange = (event) => {
    setFilter(event.target.value);
  };
  return (
    <main>
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
      </div>
      <div>
        {
          favoriteRecipes.map((recipe, i) => (
            <FavoriteRecipesInfo key={ i } favoriteRecipes={ recipe } index={ i } />
          ))
        }
      </div>

    </main>

  );
}
FavoriteRecipes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
export default FavoriteRecipes;
