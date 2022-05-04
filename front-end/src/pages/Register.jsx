import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Button from '../components/Button';
import Input from '../components/Input';
import { requestLogin } from '../services/requests';

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
      const decoded = await jwtDecode(token);
      setRole(decoded.role);
      localStorage.setItem('user', JSON.stringify({ token, ...decoded }));
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
      <div className="logo">
        Cadastro
      </div>
      <form>
        <Input
          type="text"
          labelText="name"
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
          labelText="password"
          onChange={ ({ target }) => handleChange(target, setPassword) }
          placeHolder="Digite sua senha"
          dataTestId="common_register__input-password"
        />
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
      <Button
        text="CADASTRAR"
        onClick={ (event) => register(event) }
        dataTestId="common_register__button-register"
        disabled={ password
          .length < MIN_CHARACTER || !EMAIL_REGEX.test(email) || name.length < MIN_NAME }
        className="primary__btn"
      />
      <Link to="/login">
        <Button
          text="Já tenho uma conta"
          dataTestId="common_register__button-login"
          className="terciary__btn"
        />
      </Link>
    </main>
  );
};

export default Register;
