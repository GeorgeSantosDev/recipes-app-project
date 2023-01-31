import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testa o componente Header', () => {
  it('Header deve ter um iconem de perfim e de busca', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/meals');
    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.getByTestId('search-top-btn');

    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
  });
});

it('Testa se o botão Meu Perfil redireciona para /profile', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/meals');
  const profileButton = screen.getByTestId('profile-top-btn');

  userEvent.click(profileButton);
  expect(history.location.pathname).toBe('/profile');
});

it('Testa se o botão Search aparece quando clicado e some quando clicado novamente', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/meals');

  const searchButton = screen.getByTestId('search-top-btn');
  userEvent.click(searchButton);

  const searchBar = screen.getByTestId('search-input');
  expect(searchBar).toBeInTheDocument();
  userEvent.click(searchButton);
  expect(searchBar).not.toBeInTheDocument();
});
