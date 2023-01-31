import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer data-testid="footer" className="fixar-rodape">
      <Link to="/meals" data-testid="">
        <img src={ mealIcon } alt="mealIcon" data-testid="meals-bottom-btn" />
      </Link>
      <Link to="/drinks">
        <img src={ drinkIcon } alt="drinkIcon" data-testid="drinks-bottom-btn" />
      </Link>
    </footer>
  );
}

export default Footer;
