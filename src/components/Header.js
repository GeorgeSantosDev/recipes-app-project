import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GoSearch } from 'react-icons/go';
import { SiCodechef } from 'react-icons/si';
import SearchBar from './SearchBar';
import '../styles/Header.css';
import recipe from '../images/recipe.png';
import done from '../images/done.png';
import drink from '../images/drink.png';
import fav from '../images/fav.png';
import meal from '../images/meal.png';
import prof from '../images/prof.png';

function Header() {
  const { pathname } = useLocation();
  const [showSearchBar, setShowSearchBar] = useState(false);

  const titles = {
    '/meals': 'Meals',
    '/drinks': 'Drinks',
    '/profile': 'Profile',
    '/done-recipes': 'Done Recipes',
    '/favorite-recipes': 'Favorite Recipes',
  };

  const titleIcons = {
    '/meals': meal,
    '/drinks': drink,
    '/profile': prof,
    '/done-recipes': done,
    '/favorite-recipes': fav,
  };

  const showSearchButton = pathname === '/meals' || pathname === '/drinks';

  const handleClick = () => {
    setShowSearchBar((prev) => !prev);
  };

  return (
    <header className="container-flex-collumn">

      <div className="container-icons">
        <div className="header-recipe-icon-container">
          <img src={ recipe } alt="recipe" />
          <p className="app-name">Recipes app</p>
        </div>

        {
          showSearchButton && <GoSearch onClick={ handleClick } className="icon" />
        }

        <Link to="/profile">
          <SiCodechef className="icon" />
        </Link>
      </div>

      <img src={ titleIcons[pathname] } alt="food-icon" className="food-icon" />

      <h1 data-testid="page-title" className="header-title">{ titles[pathname] }</h1>

      { showSearchBar && <SearchBar />}
    </header>
  );
}

export default Header;
