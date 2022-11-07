import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getStorage } from '../services/Storage';

function Profile() {
  const [user, setUser] = useState('');
  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(() => {
    setUser(getStorage('user').email);
  }, []);

  return (
    <section>
      <Header page={ pathname } search={ false } />
      <h1 data-testid="profile-email">{ user }</h1>
      <button
        type="button"
        data-testid="profile-done-btn"
        id="done"
        onClick={ () => { history.push('/done-recipes'); } }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        id="favorite"
        onClick={ () => { history.push('/favorite-recipes'); } }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        id="logout"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
      >
        Logout
      </button>
      <Footer />
    </section>
  );
}

export default Profile;
