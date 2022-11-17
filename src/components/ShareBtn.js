import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.png';
import '../styles/ShareBtn.css';

function ShareBtn({ type, id, datatest }) {
  const [isCopy, setIsCopy] = useState(false);

  const handleClickShareBtn = () => {
    copy(`http://localhost:3000/${type}/${id}`);
    setIsCopy(true);
  };

  return (
    <div>
      {
        isCopy && <p>Link copied!</p>
      }
      <img
        aria-hidden="true"
        data-testid={ datatest }
        src={ shareIcon }
        alt="shareIcon"
        onClick={ handleClickShareBtn }
        className="share-btn"
      />
    </div>
  );
}

ShareBtn.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  datatest: PropTypes.string.isRequired,
};

export default ShareBtn;
