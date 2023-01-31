import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

beforeEach(() => {
  let mockStorage = {};
  global.Storage.prototype.getItem = jest.fn((key) => mockStorage[key]);
  global.Storage.prototype.setItem = jest.fn((key, value) => {
    mockStorage[key] = value;
  });
  global.Storage.prototype.clear = jest.fn(() => { mockStorage = {}; });
});

const login = () => {
  const inputEmail = screen.getByTestId('email-input');
  const inputPassword = screen.getByTestId('password-input');
  const button = screen.getByRole('button', { name: /entrar/i });

  userEvent.type(inputEmail, 'teste@gmail.com');
  userEvent.type(inputPassword, '1234567');
  userEvent.click(button);
};

describe('Testa página de Login', () => {
  it('Testa se a página de perfil é renderizada corretamente', () => {
    const { history } = renderWithRouter(<App />);

    login();

    history.push('/profile');
    expect(history.location.pathname).toBe('/profile');

    const userEmail = screen.getByTestId('profile-email');
    const redirectButtons = screen.getAllByRole('button');

    expect(userEmail).toBeDefined();
    expect(redirectButtons).toHaveLength(3);
  });
  it('Testa se o botão Done Recipes redireciona para /done-recipes', () => {
    const { history } = renderWithRouter(<App />);

    login();
    history.push('/profile');

    const doneButton = screen.getByTestId('profile-done-btn');

    userEvent.click(doneButton);

    expect(history.location.pathname).toBe('/done-recipes');
  });
  it('Testa se o botão Favorite Recipes redireciona para /favorite-recipes', () => {
    const { history } = renderWithRouter(<App />);

    login();
    history.push('/profile');

    const favoriteButton = screen.getByTestId('profile-favorite-btn');

    userEvent.click(favoriteButton);

    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  it('Testa se o botão Logout redireciona para / e limpa o localStorage', () => {
    const { history } = renderWithRouter(<App />);

    login();
    history.push('/profile');

    const logoutButton = screen.getByTestId('profile-logout-btn');

    userEvent.click(logoutButton);

    expect(localStorage.clear).toHaveBeenCalled();
    expect(history.location.pathname).toBe('/');
  });
});
