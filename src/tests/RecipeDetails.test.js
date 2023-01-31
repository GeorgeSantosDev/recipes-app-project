import React from 'react';
import { waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import {
  mockDetailsMeal,
  mockDetailsDrink,
  mockDrinkRecommendation,
  mockMealRecommendation,
} from './mocks/mockDataDetailsPage';

describe('Testa a página de detalhes da receita', () => {
  beforeEach(() => {
    const store = {
      doneRecipes: JSON.stringify([{ id: 1 }, { id: 2 }, { id: 3 }]),
      inProgressRecipes: JSON.stringify({
        meals: {
          1: ['a'],
          2: ['b'],
        },
        drinks: {
          3: ['c'],
        },
      }),
    };
    global.localStorage.setItem('doneRecipes', store.doneRecipes);
    global.localStorage.setItem('inProgressRecipes', store.inProgressRecipes);
  });

  const mealWay = '/meals/52775';
  const drinkWay = '/drinks/15997';

  it('Testa se ao renderizar a página em um caminho /meals o fetch de Meals é chamado corretamente', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockDetailsMeal),
    }));

    const { history } = renderWithRouter(<App />);
    history.push(mealWay);
    expect(history.location.pathname).toBe(mealWay);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52775');
    });
  });
  it('Testa se ao renderizar a página em um caminho /drinks o fetch de Drinks é chamado corretamente', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockDetailsDrink),
    }));
    const { history } = renderWithRouter(<App />);
    history.push('drinks/15997');
    expect(history.location.pathname).toBe(drinkWay);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997');
    });
  });
  it('Testa se ao renderizar a página em um caminho /meals o fetch de drinks é chamado corretamente', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockDrinkRecommendation),
    }));

    const { history } = renderWithRouter(<App />);
    history.push(mealWay);
    expect(history.location.pathname).toBe(mealWay);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    });
  });
  it('Testa se ao renderizar a página em um caminho /drinks o fetch de Meals é chamado corretamente', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockMealRecommendation),
    }));

    const { history } = renderWithRouter(<App />);
    history.push('drinks/15997');
    expect(history.location.pathname).toBe(drinkWay);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    });
  });
  it('Testa se ao clicar no botão de começar a receita o usuário é redirecionado para a página correta', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(mealWay);

    await waitFor(() => {
      const startBtn = screen.getByRole('button', { name: /Start Recipe/i });
      userEvent.click(startBtn);
      expect(history.location.pathname).toBe(`${mealWay}/in-progress`);
    });
  });
});
