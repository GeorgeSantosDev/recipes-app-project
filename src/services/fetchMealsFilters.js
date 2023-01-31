export const fetchMealsByIngredient = async (ingredient) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();
    console.log(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    return data.meals;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMealsByName = async (name) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const data = await response.json();
    console.log(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    return data.meals;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMealsByLetter = async (letter) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    const data = await response.json();
    console.log(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    return data.meals;
  } catch (error) {
    console.log(error);
  }
};
