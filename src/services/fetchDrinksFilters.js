export const fetchDrinksByIngredient = async (ingredient) => {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;

    const response = await fetch(url);
    const data = await response.json();

    return data.drinks;
  } catch (error) {
    console.log(`Ocorreu um erro: ${error}`);
  }
};

export const fetchDrinksByName = async (name) => {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;

    const response = await fetch(url);
    const data = await response.json();

    return data.drinks;
  } catch (error) {
    console.log(`Ocorreu um erro: ${error}`);
  }
};

export const fetchDrinksByLetter = async (letter) => {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`;

    const response = await fetch(url);
    const data = await response.json();

    return data.drinks;
  } catch (error) {
    console.log(`Ocorreu um erro: ${error}`);
  }
};
