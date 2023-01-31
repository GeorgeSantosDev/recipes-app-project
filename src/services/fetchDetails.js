export const fetchDetailsMeals = async (id) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDetailsDrinks = async (id) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.log(error);
  }
};
