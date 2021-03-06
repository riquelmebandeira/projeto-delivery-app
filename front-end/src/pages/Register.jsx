import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Button from '../components/Button';
import Input from '../components/Input';
import { requestLogin as requestRegister } from '../services/requests';
import '../styles/pages/Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [failedRegister, setFailedRegister] = useState(false);
  const [role, setRole] = useState('');

  const register = async (event) => {
    event.preventDefault();
    try {
      const endpoint = '/users';

      const { token } = await requestRegister(endpoint, { name, email, password });
      const user = await jwtDecode(token);
      setRole(user.role);
      localStorage.setItem('user', JSON.stringify({ token, ...user }));
      setIsLogged(true);
    } catch (error) {
      setFailedRegister(true);
      setIsLogged(false);
    }
  };

  const handleChange = (target, stateFunction) => {
    stateFunction(target.value);
  };

  useEffect(() => {
    setFailedRegister(false);
  }, [email, password]);

  if (isLogged) return <Navigate to={ `/${role}/` } />;

  const MIN_NAME = 12;
  const MIN_CHARACTER = 6;
  const EMAIL_REGEX = /.+@.+\..+/;

  return (
    <main className="register-page">
      <form className="acess-form">
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
          className="primary__btn"
        />
        <Link to="/login">
          <Button
            text="J?? tenho uma conta"
            dataTestId="common_register__button-login"
            className="terciary__btn"
          />
        </Link>
      </form>
      {
        (failedRegister)
          ? (
            <p data-testid="common_register__element-invalid_register"
            className="error-message"
            >
              {
                `O endere??o de e-mail, senha ou nome 
                n??o atendem ao requisitos do cadastro.
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
