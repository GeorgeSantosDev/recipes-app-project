import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.png';
import '../styles/ShareBtn.css';

function ShareBtn({ type, id, datatest }) {
  const [isCopy, setIsCopy] = useState(false);
  const { pathname } = useLocation();
  const checkBtnClass = pathname.includes('drinks') || pathname.includes('meals');

  const handleClickShareBtn = () => {
    copy(`http://localhost:3000/${type}/${id}`);
    setIsCopy(true);
  };

  return (
    <div className="share-btn-container">
      <img
        aria-hidden="true"
        data-testid={ datatest }
        src={ shareIcon }
        alt="shareIcon"
        onClick={ handleClickShareBtn }
        className={ checkBtnClass ? 'share-btn' : 'share-btn-fav-done' }
      />

      {
        isCopy && <span>Link copied!</span>
      }
    </div>
  );
}

ShareBtn.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  datatest: PropTypes.string.isRequired,
};

export default ShareBtn;
