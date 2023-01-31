import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

const login = () => {
  const inputEmail = screen.getByTestId('email-input');
  const inputPassword = screen.getByTestId('password-input');
  const button = screen.getByRole('button', { name: /entrar/i });

  userEvent.type(inputEmail, 'teste@gmail.com');
  userEvent.type(inputPassword, '1234567');
  userEvent.click(button);
};

const BTN_MEALS = 'meals-bottom-btn';
const BTN_DRINKS = 'drinks-bottom-btn';

describe('Testa o componente Footer', () => {
  it('Testa se os botões aparecem na página Profile', () => {
    const { history } = renderWithRouter(<App />);

    login();

    const buttonMeals = screen.getByTestId(BTN_MEALS);
    const buttonDrinks = screen.getByTestId(BTN_DRINKS);

    history.push('/profile');
    expect(history.location.pathname).toBe('/profile');
    expect(buttonMeals).toBeDefined();
    expect(buttonDrinks).toBeDefined();
  });
  it('Testa se os botões aparecem na página Meals', () => {
    const { history } = renderWithRouter(<App />);

    login();

    const buttonMeals = screen.getByTestId(BTN_MEALS);
    const buttonDrinks = screen.getByTestId(BTN_DRINKS);

    history.push('/meals');
    expect(history.location.pathname).toBe('/meals');
    expect(buttonMeals).toBeDefined();
    expect(buttonDrinks).toBeDefined();
  });
  it('Testa se os botões aparecem na página drinks', () => {
    const { history } = renderWithRouter(<App />);

    login();

    const buttonMeals = screen.getByTestId(BTN_MEALS);
    const buttonDrinks = screen.getByTestId(BTN_DRINKS);

    history.push('/drinks');
    expect(history.location.pathname).toBe('/drinks');
    expect(buttonMeals).toBeDefined();
    expect(buttonDrinks).toBeDefined();
  });
  it('Testa se os botões redirecionam para as páginas certas', () => {
    const { history } = renderWithRouter(<App />);

    login();

    const buttonMeals = screen.getByTestId(BTN_MEALS);
    const buttonDrinks = screen.getByTestId(BTN_DRINKS);

    history.push('/meals');
    expect(history.location.pathname).toBe('/meals');

    userEvent.click(buttonDrinks);
    expect(history.location.pathname).toBe('/drinks');

    userEvent.click(buttonMeals);
    expect(history.location.pathname).toBe('/meals');
  });
});
