import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Button from '../components/Button';
import Input from '../components/Input';
import { requestLogin } from '../services/requests';
import '../styles/pages/Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const [role, setRole] = useState('');

  const register = async (event) => {
    event.preventDefault();
    try {
      const endpoint = '/users';

      const { token } = await requestLogin(endpoint, { name, email, password });
      const user = await jwtDecode(token);
      setRole(user.role);
      localStorage.setItem('user', JSON.stringify({ token, ...user }));
      setIsLogged(true);
    } catch (error) {
      setFailedTryLogin(true);
      setIsLogged(false);
    }
  };

  const handleChange = (target, stateFunction) => {
    stateFunction(target.value);
  };

  useEffect(() => {
    setFailedTryLogin(false);
  }, [email, password]);

  if (isLogged) return <Navigate to={ `/${role}/` } />;

  const MIN_NAME = 12;
  const MIN_CHARACTER = 6;
  const EMAIL_REGEX = /.+@.+\..+/;

  return (
    <main className="login">
      <div className="logo" />
      <form className="register-form">
        <Input
          type="text"
          labelText="Nome"
          onChange={ ({ target }) => handleChange(target, setName) }
          placeHolder="Seu nome"
          dataTestId="common_register__input-name"
        />
        <Input
          type="email"
          labelText="Email"
          onChange={ ({ target }) => handleChange(target, setEmail) }
          placeHolder="email@email.com.br"
          dataTestId="common_register__input-email"
        />
        <Input
          type="password"
          labelText="Senha"
          onChange={ ({ target }) => handleChange(target, setPassword) }
          placeHolder="Digite sua senha"
          dataTestId="common_register__input-password"
        />
        <Button
          text="CADASTRAR"
          onClick={ (event) => register(event) }
          dataTestId="common_register__button-register"
          disabled={ password
            .length < MIN_CHARACTER
            || !EMAIL_REGEX.test(email)
            || name.length < MIN_NAME }
          className="primary__btn"
        />
        <Link to="/login">
          <Button
            text="Já tenho uma conta"
            dataTestId="common_register__button-login"
            className="terciary__btn"
          />
        </Link>
      </form>
      {
        (failedTryLogin)
          ? (
            <p data-testid="common_register__element-invalid_register">
              {
                `O endereço de e-mail, senha ou nome 
                não atendem ao requisitos do cadastro.
                    Por favor, tente novamente.`
              }
            </p>
          )
          : null
      }
    </main>
  );
};

export default Register;
