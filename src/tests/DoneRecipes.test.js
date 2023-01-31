import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import mockDoneRecipes from './mocks/mockDoneRecipes';

describe('Teste da página Done Recipes', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);

    localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));
    history.push('/done-recipes');
  });
  afterEach(() => localStorage.clear());

  it('Testa se é renderizado os botões de filtro na página', () => {
    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-meal-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
  });
  it('Testa se os cards aparecem na página', async () => {
    await waitFor(() => {
      mockDoneRecipes.forEach(({ tags }, index) => {
        expect(screen.getByTestId(`${index}-horizontal-image`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-horizontal-top-text`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-horizontal-name`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-horizontal-done-date`)).toBeInTheDocument();
        expect(screen.getByTestId(`${index}-horizontal-share-btn`)).toBeInTheDocument();
        tags.forEach((tag) => {
          expect(screen
            .getByTestId(`${index}-${tag}-horizontal-tag`)).toBeInTheDocument();
        });
      });
    });
  });
  it('Testa se renderiza as informações corretas dos cards', async () => {
    await waitFor(() => {
      mockDoneRecipes
        .forEach(({
          image,
          nationality, category, name, doneDate, tags, alcoholicOrNot }, index) => {
          const text = `${alcoholicOrNot.length ? alcoholicOrNot
            : nationality} - ${category}`;

          expect(screen.getByTestId(`${index}-horizontal-image`).src).toBe(image);
          expect(screen.getByTestId(`${index}-horizontal-top-text`).innerHTML).toBe(text);
          expect(screen.getByTestId(`${index}-horizontal-name`).innerHTML).toBe(name);
          expect(screen.getByTestId(`${index}-horizontal-done-date`).innerHTML)
            .toBe(doneDate);
          tags.forEach((tag) => {
            expect(screen.getByTestId(`${index}-${tag}-horizontal-tag`).innerHTML)
              .toBe(tag);
          });
        });
    });
  });
  it('Testa se os botoẽs de filtro estão funcionando corretamente', async () => {
    const NAME_0 = '0-horizontal-name';
    const NAME_1 = '1-horizontal-name';
    await waitFor(() => {
      userEvent.click(screen.getByTestId('filter-by-meal-btn'));

      expect(screen.getByTestId(NAME_0).innerHTML).toBe(mockDoneRecipes[0].name);
      expect(screen.queryByTestId(NAME_1)).not.toBeInTheDocument();

      userEvent.click(screen.getByTestId('filter-by-drink-btn'));

      expect(screen.getByTestId(NAME_0).innerHTML).toBe(mockDoneRecipes[1].name);
      expect(screen.queryByTestId(NAME_1)).not.toBeInTheDocument();

      userEvent.click(screen.getByTestId('filter-by-all-btn'));

      expect(screen.getByTestId(NAME_0).innerHTML).toBe(mockDoneRecipes[0].name);
      expect(screen.queryByTestId(NAME_1)).toBeInTheDocument();
    });
  });
});
