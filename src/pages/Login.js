import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { setStorage } from '../services/Storage';
import '../styles/Login.css';
import logo from '../images/logo.png';
import tomato from '../images/tomate.png';

const MINIMUM_PASSWORD_LENGTH = 6;

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const setFunctions = {
    email: setEmail,
    password: setPassword,
  };

  const handleChange = ({ target }) => {
    setFunctions[target.name](target.value);
  };

  const handleClick = async () => {
    setStorage('user', { email });
    setStorage('mealsToken', 1);
    setStorage('drinksToken', 1);
    history.push('/meals');
  };

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const isDisabled = password.length <= MINIMUM_PASSWORD_LENGTH
  || !emailRegex.test(email);

  return (
    <section className="container-flex-collumn">
      <div className="logo-container">
        <img src={ logo } alt="logo" className="logo-image" />
      </div>

      <img src={ tomato } alt="logo" className="tomato-image" />

      <h1 className="login-title">Login</h1>

      <form className="container-flex-collumn form-container">
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            data-testid="email-input"
            value={ email }
            className="login-input"
            onChange={ (e) => handleChange(e) }
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            id="password"
            data-testid="password-input"
            placeholder="Senha"
            value={ password }
            className="login-input"
            onChange={ (e) => handleChange(e) }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ isDisabled }
          onClick={ handleClick }
          className="login-btn"
        >
          Entrar
        </button>
      </form>
    </section>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
