import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getStorage, setStorage } from '../services/Storage';
import recipesContext from '../context/RecipesContext';

function CheckboxInput({ ingredient, index, amountOfMeasure }) {
  const [isChecked, setIsChecked] = useState(true);

  const { pathname } = useLocation();
  const { setIngredientCheck } = useContext(recipesContext);

  const urlSplit = pathname.split('/');
  // ['', 'meals or drinks', 'id', 'in-progress']

  useEffect(() => {
    const getInProgressRecipes = getStorage('inProgressRecipes');

    if (getInProgressRecipes
        && getInProgressRecipes[urlSplit[1]]
        && getInProgressRecipes[urlSplit[1]][urlSplit[2]]) {
      const alreadyUsed = getInProgressRecipes[urlSplit[1]][urlSplit[2]]
        .some((ing) => ing === ingredient[1]);
      console.log(getInProgressRecipes[urlSplit[1]][urlSplit[2]]);
      console.log(alreadyUsed);
      setIsChecked(alreadyUsed);
    } else {
      console.log('entrei aqui');
      setIsChecked(false);
    }
  }, []);

  const handleChange = () => {
    setIsChecked((prev) => !prev);
    const getInProgressRecipes = getStorage('inProgressRecipes');

    const valueDrinksOrMeals = getInProgressRecipes && getInProgressRecipes[urlSplit[1]]
      ? getInProgressRecipes[urlSplit[1]] : {};

    const valueId = getInProgressRecipes && valueDrinksOrMeals[urlSplit[2]]
      ? valueDrinksOrMeals[urlSplit[2]] : [];

    if (isChecked) {
      const newProgress = { ...getInProgressRecipes,
        [urlSplit[1]]: { ...valueDrinksOrMeals,
          [urlSplit[2]]: valueId.filter((ing) => ing !== ingredient[1]),
        },
      };
      setStorage('inProgressRecipes', newProgress);
      setIngredientCheck([ingredient[1]]);
    } else {
      const newProgress = { ...getInProgressRecipes,
        [urlSplit[1]]: { ...valueDrinksOrMeals,
          [urlSplit[2]]: [...valueId, ingredient[1]],
        },
      };
      setStorage('inProgressRecipes', newProgress);
      setIngredientCheck([ingredient[1]]);
    }
  };

  const checkIngredient = isChecked ? 'line-through' : 'none';

  return (
    <form>
      <label
        htmlFor={ `ing-${index}` }
        data-testid={ `${index}-ingredient-step` }
        style={ { textDecoration: checkIngredient } }
      >
        {`${ingredient[1]}: ${amountOfMeasure[index][1]}`}
        <input
          type="checkbox"
          id={ `ing-${index}` }
          name={ `ing-${index}` }
          onChange={ handleChange }
          checked={ isChecked }
        />
      </label>
    </form>
  );
}

CheckboxInput.propTypes = {
  ingredient: PropTypes.arrayOf(PropTypes.string).isRequired,
  amountOfMeasure: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  index: PropTypes.number.isRequired,
};

export default CheckboxInput;
