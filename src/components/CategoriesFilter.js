import React from 'react';
import { useLocation } from 'react-router-dom';
import recipesContext from '../context/RecipesContext';
import fetchCategories from '../services/fetchCategories';
import fetchDrinks from '../services/fetchDrinks';
import fetchMeals from '../services/fetchMeals';
import fetchRecipesWithCategorie from '../services/fetchRecipesWithCategorie';

function CategoriesFilters() {
  const [SelectedCategory, setSelectedCategory] = React.useState('');
  const MAX_CATEGORIES = 5;
  const {
    CategoriesFilter,
    setCategoriesFilter,
    setRecipesToRender,
  } = React.useContext(recipesContext);
  const location = useLocation();
  const path = location.pathname;

  const getCategoriesOptions = async () => {
    const data = await fetchCategories(path);
    setCategoriesFilter(data);
  };

  React.useEffect(() => {
    getCategoriesOptions();
  }, [path]);

  const handleResetFilter = async () => {
    const meals = await fetchMeals();
    const drinks = await fetchDrinks();
    if (path === '/meals') {
      setRecipesToRender(meals);
    } else {
      setRecipesToRender(drinks);
    }
  };

  const handleFilter = async (categorie) => {
    if (SelectedCategory === categorie) {
      handleResetFilter();
      setSelectedCategory('');
    } else {
      const data = await fetchRecipesWithCategorie(path, categorie);
      setSelectedCategory(categorie);
      setRecipesToRender(data);
    }
  };

  return (
    <div>
      {CategoriesFilter?.length
      && CategoriesFilter.slice(0, MAX_CATEGORIES).map((category, i) => (
        <button
          type="button"
          key={ i }
          data-testid={ `${category?.strCategory}-category-filter` }
          onClick={ () => handleFilter(category?.strCategory) }
        >
          {category?.strCategory}
        </button>

      ))}
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ handleResetFilter }
      >
        All
      </button>

    </div>
  );
}

export default CategoriesFilters;
