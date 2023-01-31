const fetchCategories = async (pathname = '/meals') => {
  const API_URL = pathname === '/meals'
    ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.meals || data.drinks;
  } catch (error) {
    console.log(error);
  }
};

export default fetchCategories;
