export const fetchMealByCategory = async (category) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();

    return data.meals;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDrinkByCategory = async (category) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();

    return data.drinks;
  } catch (error) {
    console.log(error);
  }
};
