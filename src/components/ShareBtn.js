import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function ShareBtn() {
  const { pathname } = useLocation();
  const [isCopy, setIsCopy] = useState(false);

  const handleClickShareBtn = () => {
    copy(`http://localhost:3000${pathname}`);
    setIsCopy(true);
  };

  return (
    <div>
      {
        isCopy && <p>Link copied!</p>
      }
      <img
        aria-hidden="true"
        data-testid="share-btn"
        src={ shareIcon }
        alt="shareIcon"
        onClick={ handleClickShareBtn }
      />
    </div>
  );
}

export default ShareBtn;
