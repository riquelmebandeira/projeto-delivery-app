import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Button from '../components/Button';
import Input from '../components/Input';
import { requestLogin } from '../services/requests';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const [role, setRole] = useState('');

  const login = async (event) => {
    event.preventDefault();
    try {
      const endpoint = '/login';
      
      const { token } = await requestLogin(endpoint, { email, password });
      const decoded = jwtDecode(token);
      setRole(decoded.role);
      localStorage.setItem('token', JSON.stringify({ token }));
      localStorage.setItem('user', JSON.stringify({ ...decoded }));

      setIsLogged(true);
    } catch (error) {
      console.log(error);
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

  const MIN_CHARACTER = 6;
  const EMAIL_REGEX = /.+@.+\..+/;

  return (
    <main className="login">
      <div className="logo">
        { /* <img src={logo} alt="logo" /> */}
      </div>
      <form>
        <Input
          type="email"
          labelText="login"
          onChange={ ({ target }) => handleChange(target, setEmail) }
          placeHolder="email@email.com.br"
          dataTestId="common_login__input-email"
        />
        <Input
          type="password"
          labelText="password"
          onChange={ ({ target }) => handleChange(target, setPassword) }
          placeHolder="Digite sua senha"
          dataTestId="common_login__input-password"
        />
      </form>
      {
        (failedTryLogin)
          ? (
            <p data-testid="common_login__element-invalid-email">
              {
                `O endereço de e-mail ou a senha não estão corretos.
                    Por favor, tente novamente.`
              }
            </p>
          )
          : null
      }
      <Button
        text="LOGIN"
        onClick={ (event) => login(event) }
        dataTestId="common_login__button-login"
        disabled={ password.length < MIN_CHARACTER || !EMAIL_REGEX.test(email) }
        className="primary__btn"
      />
      <Link to="/register">
        <Button
          text="Ainda não tenho uma conta"
          dataTestId="common_login__button-register"
          className="terciary__btn"
        />
      </Link>
    </main>
  );
};

export default Login;
