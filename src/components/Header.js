import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

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

  const showSearchButton = pathname === '/meals' || pathname === '/drinks';

  const handleClick = () => {
    setShowSearchBar((prev) => !prev);
  };

  return (
    <header>
      <Link to="/profile">
        <img src={ ProfileIcon } alt="Profile Icon" data-testid="profile-top-btn" />
      </Link>

      <h1 data-testid="page-title">{ titles[pathname] }</h1>

      {
        showSearchButton && (
          <button type="button" onClick={ handleClick }>
            <img src={ SearchIcon } alt="Search Icon" data-testid="search-top-btn" />
          </button>
        )
      }

      { showSearchBar && <SearchBar />}
    </header>
  );
}

export default Header;
