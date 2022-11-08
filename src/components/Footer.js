import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import drink from '../images/drink.png';
import meal from '../images/meal.png';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/meals" data-testid="">
        <img
          src={ meal }
          alt="mealIcon"
          data-testid="meals-bottom-btn"
          className="icon"
        />
      </Link>

      <Link to="/drinks">
        <img
          src={ drink }
          alt="drinkIcon"
          data-testid="drinks-bottom-btn"
          className="icon"
        />
      </Link>
    </footer>
  );
}

export default Footer;
