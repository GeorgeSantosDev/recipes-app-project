import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

const idEMail = 'email-input';
const idPassword = 'password-input';
const emailTest = 'teste@gmail.com';

describe('Testando a página de Login', () => {
  it('Testa se os inputs de email e senha e o botão de login existem', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(idEMail);
    const inputPassword = screen.getByTestId(idPassword);
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(inputEmail).toBeDefined();
    expect(inputPassword).toBeDefined();
    expect(button).toBeDefined();
  });
  it('Testa se os inputs de email e senha são preenchidos corretamente', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(idEMail);
    const inputPassword = screen.getByTestId(idPassword);

    userEvent.type(inputEmail, emailTest);
    userEvent.type(inputPassword, '123456');

    expect(inputEmail.value).toBe(emailTest);
    expect(inputPassword.value).toBe('123456');
  });
  it('Testa se o botão está desabilitado quando temos email fora padrão', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(idEMail);
    const inputPassword = screen.getByTestId(idPassword);
    const button = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, 'testgmail.com');
    userEvent.type(inputPassword, '1234567');

    expect(button).toBeDisabled();
  });
  it('Testa se o botão está desabilitado quando temos senha fora padrão', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(idEMail);
    const inputPassword = screen.getByTestId(idPassword);
    const button = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, emailTest);
    userEvent.type(inputPassword, '12345');

    expect(button).toBeDisabled();
  });
  it('Testa se o botão está habilitado quando colocamos email e senha certos', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(idEMail);
    const inputPassword = screen.getByTestId(idPassword);
    const button = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, emailTest);
    userEvent.type(inputPassword, '1234567');

    expect(button).not.toBeDisabled();
  });
  it('Testa se ao clicar no botão localStorage é chamado', () => {
    jest.spyOn(Storage.prototype, 'setItem');
    Storage.prototype.setItem = jest.fn();

    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(idEMail);
    const inputPassword = screen.getByTestId(idPassword);
    const button = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, emailTest);
    userEvent.type(inputPassword, '1234567');
    userEvent.click(button);

    expect(localStorage.setItem).toHaveBeenCalledTimes(3);
    expect(history.location.pathname).toBe('/meals');
  });
});
