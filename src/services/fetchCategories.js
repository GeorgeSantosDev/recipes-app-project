export const fetchMealCategories = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();

    return data.meals;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDrinkCategories = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();

    return data.drinks;
  } catch (error) {
    console.log(error);
  }
};
