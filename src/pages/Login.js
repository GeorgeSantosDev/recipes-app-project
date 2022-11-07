import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { setStorage } from '../services/Storage';

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
    <form>
      <label htmlFor="email">
        <input
          type="email"
          name="email"
          id="email"
          data-testid="email-input"
          value={ email }
          onChange={ (e) => handleChange(e) }
        />
      </label>
      <label htmlFor="password">
        <input
          type="password"
          name="password"
          id="password"
          data-testid="password-input"
          value={ password }
          onChange={ (e) => handleChange(e) }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ isDisabled }
        onClick={ handleClick }
      >
        Entrar
      </button>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
