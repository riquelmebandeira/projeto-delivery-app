import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Button from '../components/Button';
import Input from '../components/Input';
import { requestLogin } from '../services/requests';
import '../styles/pages/Login.css';
import { isAuthenticated } from '../utils/isAuthenticated';

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
      const user = jwtDecode(token);
      setRole(user.role);
      localStorage.setItem('user', JSON.stringify({ token, ...user }));
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

  useEffect(() => {
    async function verifyUserAuth() {
      const role = await isAuthenticated()

      if (role) {
        setRole(role)
        setIsLogged(true)
      }
    }

    verifyUserAuth()
  }, [])

  if (isLogged) return <Navigate to={ `/${role}/` } />;

  const MIN_CHARACTER = 6;
  const EMAIL_REGEX = /.+@.+\..+/;

  return (
    <main className="login-page">
      <form className="acess-form">
        <Input
          type="email"
          labelText="Login"
          onChange={ ({ target }) => handleChange(target, setEmail) }
          placeHolder="email@email.com.br"
          dataTestId="common_login__input-email"
        />
        <Input
          type="password"
          labelText="Senha"
          onChange={ ({ target }) => handleChange(target, setPassword) }
          placeHolder="Digite sua senha"
          dataTestId="common_login__input-password"
        />
        <Button
          text="LOGIN"
          onClick={ (event) => login(event) }
          dataTestId="common_login__button-login"
          disabled={ password.length < MIN_CHARACTER || !EMAIL_REGEX.test(email) }
          className="primary__btn"
        />
        <Link to="/register">
          <Button
            text="Ainda n??o tenho uma conta"
            dataTestId="common_login__button-register"
            className="terciary__btn"
          />
        </Link>
      </form>
      {
        failedTryLogin && (
          <p
            data-testid="common_login__element-invalid-email"
            className="error-message"
          >
            {
              `O endere??o de e-mail ou a senha n??o est??o corretos.
                    Por favor, tente novamente.`
            }
          </p>
        )
      }
    </main>
  );
};

export default Login;
