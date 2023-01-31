import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getStorage } from '../services/Storage';
import '../styles/Profile.css';
import done from '../images/done.png';
import logout from '../images/logout.png';
import fav from '../images/fav.png';

function Profile() {
  const [user, setUser] = useState('');
  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(() => {
    setUser(getStorage('user').email);
  }, []);

  return (
    <section className="container-flex-collumn">
      <Header page={ pathname } search={ false } />
      <h1 data-testid="profile-email" className="profile-email">{ user }</h1>

      <div className="icon-route-container">
        <img
          aria-hidden="true"
          data-testid="profile-done-btn"
          id="done"
          onClick={ () => { history.push('/done-recipes'); } }
          src={ done }
          alt="done-icon"
        />
        <span className="icon-names">Done Recipes</span>
      </div>
      <hr className="line" />

      <div className="icon-route-container">
        <img
          aria-hidden="true"
          data-testid="profile-favorite-btn"
          id="favorite"
          onClick={ () => { history.push('/favorite-recipes'); } }
          src={ fav }
          alt="favorites-icon"
        />
        <span className="icon-names">Favorite Recipes</span>
      </div>
      <hr className="line" />

      <div className="icon-route-container">
        <img
          aria-hidden="true"
          data-testid="profile-logout-btn"
          id="logout"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
          src={ logout }
          alt="logout-icon"
        />
        <span className="icon-names">Logout</span>
      </div>

      <Footer />
    </section>
  );
}

export default Profile;
