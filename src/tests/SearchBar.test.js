import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import beefMeals from './mocks/beefMeals';
import drinks from './mocks/drinks';

const EMAIL_INPUT = 'email-input';
const EMAIL = 'traybe@test.com.br';
const PASSWORD_INPUT = 'password-input';
const PASSWORD = '1234567';
const LOGIN_BTN = 'login-submit-btn';

const SEARCH_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const SEARCH_BTN2 = 'exec-search-btn';
const INGREDIENT_RADIO = 'ingredient-search-radio';
const NAME_RADIO = 'name-search-radio';
const FIRST_LETTER_RADIO = 'first-letter-search-radio';
const DRINK_BTN = 'drinks-bottom-btn';

const fetchDrinks = Promise.resolve(drinks);
const ALERT1 = 'Your search must have only 1 (one) character';
const ALERT2 = 'Sorry, we haven\'t found any recipes for these filters.';

describe('Teste o componente SearchBar', () => {
  beforeEach(async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(beefMeals),
    }));
    jest.spyOn(window, 'alert');

    renderWithRouter(<App />);
    userEvent.type(screen.getByTestId(EMAIL_INPUT), EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT), PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_BTN));
    userEvent.click(screen.getByTestId(SEARCH_BTN));
  });

  afterEach(() => jest.clearAllMocks());

  it('Tem os data-testids tanto da barra de busca quanto de todos os radio-buttons', async () => {
    await waitFor(async () => {
      const searchInput = screen.getByTestId(SEARCH_INPUT);
      const ingredientRadio = screen.getByTestId(INGREDIENT_RADIO);
      const nameRadio = screen.getByTestId(NAME_RADIO);
      const firstLetterRadio = screen.getByTestId(FIRST_LETTER_RADIO);
      const searchButton = screen.getByTestId(SEARCH_BTN2);

      expect(searchInput).toBeInTheDocument();
      expect(ingredientRadio).toBeInTheDocument();
      expect(nameRadio).toBeInTheDocument();
      expect(firstLetterRadio).toBeInTheDocument();
      expect(searchButton).toBeInTheDocument();
    });
  });

  it('Busque na API de comidas caso a pessoa esteja na página de comidas, e na API de bebidas caso esteja na de bebidas', () => {
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchInput, 'beef');
    const nameRadio = screen.getByTestId(NAME_RADIO);
    userEvent.click(nameRadio);
    const searchButton = screen.getByTestId(SEARCH_BTN2);
    userEvent.click(searchButton);

    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=beef');
  });
  it('Testa se a busca é feita por ingredientes', () => {
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchInput, 'beef');
    const ingredientRadio = screen.getByTestId(INGREDIENT_RADIO);
    userEvent.click(ingredientRadio);
    const searchButton = screen.getByTestId(SEARCH_BTN2);
    userEvent.click(searchButton);

    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=beef');
  });
  it('Testa se a busca de comidas é feita por primeira letra', () => {
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchInput, 'b');
    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_RADIO);
    userEvent.click(firstLetterRadio);
    const searchButton = screen.getByTestId(SEARCH_BTN2);
    userEvent.click(searchButton);

    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=b');
  });
  it('Testa se o termo da pesquisa for beef e o botão de primeira letra for selecionado aparece um alerta', () => {
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchInput, 'beef');
    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_RADIO);
    userEvent.click(firstLetterRadio);
    const searchButton = screen.getByTestId(SEARCH_BTN2);
    userEvent.click(searchButton);

    expect(window.alert).toBeCalledWith(ALERT1);
  });
  it('Testa se o termo da pesquisa tiver vazio emite um alerta', () => {
    const searchButton = screen.getByTestId(SEARCH_BTN2);
    userEvent.click(searchButton);

    expect(window.alert).toBeCalledWith(ALERT1);
  });

  it('Testa se não achar o termo da pesquisa por nome emite um alerta', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ meals: null }),
    }));
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchInput, 'xablau');
    const nameRadio = screen.getByTestId(NAME_RADIO);
    userEvent.click(nameRadio);
    const searchButton = screen.getByTestId(SEARCH_BTN2);
    userEvent.click(searchButton);

    await waitFor(() => expect(window.alert).toBeCalledWith(ALERT2));
  });
  it('Testa se não achar o termo da pesquisa por ingrediente emite um alerta', async () => {
    const promise = Promise.resolve({ meals: null });
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => promise,
    }));
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchInput, 'xablau');
    const ingredients = screen.getByTestId(INGREDIENT_RADIO);
    userEvent.click(ingredients);
    const searchButton = screen.getByTestId(SEARCH_BTN2);
    userEvent.click(searchButton);

    await waitFor(() => expect(window.alert).toBeCalledWith(ALERT2));
  });
  it('Testa se não achar o termo da pesquisa pela primeira letra emite um alerta', async () => {
    const promisee = Promise.resolve({ meals: null });
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => promisee,
    }));
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchInput, 'x');
    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_RADIO);
    userEvent.click(firstLetterRadio);
    const searchButton = screen.getByTestId(SEARCH_BTN2);
    userEvent.click(searchButton);

    await waitFor(() => expect(window.alert).toBeCalledWith(ALERT2));
  });
  it('Testa se não achar um drink pelo termo da pesquisa emite um alerta', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ drinks: null }),
    }));
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchInput, 'xablau');
    const nameRadio = screen.getByTestId(NAME_RADIO);
    userEvent.click(nameRadio);
    const searchButton = screen.getByTestId(SEARCH_BTN2);
    userEvent.click(searchButton);

    await waitFor(() => expect(window.alert).toBeCalledWith(ALERT2));
  });
  it('Testa se busca drinks na API correta', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(drinks),
    }));
    const drinkBtn = screen.getByTestId(DRINK_BTN);
    userEvent.click(drinkBtn);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchInput, 'wine');
    const nameRadio = screen.getByTestId(NAME_RADIO);
    userEvent.click(nameRadio);
    const searchButton = screen.getByTestId(SEARCH_BTN2);
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=wine');
    });
  });
  it('Testa se colocar wine e pedir apenas a primeira letra aparece um alerta', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => fetchDrinks,
    }));
    const drinkBtn = screen.getByTestId(DRINK_BTN);
    userEvent.click(drinkBtn);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchInput, 'wine');
    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_RADIO);
    userEvent.click(firstLetterRadio);
    const searchButton = screen.getByTestId(SEARCH_BTN2);
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(window.alert).toBeCalledWith(ALERT1);
    });
  });
  it('testa se redireciona para a tela de detalhes', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ meals: [{ idMeal: '52952' }] }),
    }));
    const { history } = renderWithRouter(<App />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT), EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT), PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_BTN));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'beef');
    userEvent.click(screen.getByTestId(NAME_RADIO));
    userEvent.click(screen.getByTestId(SEARCH_BTN2));

    await waitFor(() => {
      const mealCard = screen.getByTestId('0-recipe-card');
      userEvent.click(mealCard);
      expect(history.location.pathname).toBe('/meals/52952');
    });
  });
  it('Testa se consegue buscar drinks por ingredientes', async () => {
    const drinkss = drinks;
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(drinkss),
    }));
    const drinkBtn = screen.getByTestId(DRINK_BTN);
    userEvent.click(drinkBtn);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchInput, 'ginger');
    const ingredientRadio = screen.getByTestId(INGREDIENT_RADIO);
    userEvent.click(ingredientRadio);
    const searchButton = screen.getByTestId(SEARCH_BTN2);
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=ginger');
    });
  });

  it('Testa se consegue buscar drinks por primeira letra', async () => {
    const drinksss = drinks;
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(drinksss),
    }));
    const drinkBtn = screen.getByTestId(DRINK_BTN);
    userEvent.click(drinkBtn);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchInput, 'g');
    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_RADIO);
    userEvent.click(firstLetterRadio);
    const searchButton = screen.getByTestId(SEARCH_BTN2);
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=g');
    });
  });
});
