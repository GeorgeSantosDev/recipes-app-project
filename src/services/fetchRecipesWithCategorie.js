const fetchRecipesWithCategorie = async (pathname, categorie) => {
  const API_URL = pathname === '/meals'
    ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`
    : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categorie}`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.meals || data.drinks;
  } catch (error) {
    console.log(error);
  }
};

export default fetchRecipesWithCategorie;
