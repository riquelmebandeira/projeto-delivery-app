import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import NavBar from '../components/NavBar';
import Select from '../components/Select';
import Input from '../components/Input';
import { postOrders as postUser } from '../services/requests';
import { ROLE_OPTIONS, EMAIL_REGEX, NAME_LENGTH, PWD_LENGTH } from '../utils';
import '../styles/pages/AdminManage.css';

export default function CustomerProducts() {
  const [sessionUser, setSessionUser] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = '/users/admin';
    const { token } = sessionUser;

    try {
      await postUser(endpoint, token, { name, email, password, role });
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem('user'));

    setSessionUser(userStorage);
  }, []);

  return (
    <>
      {sessionUser && <NavBar props={ sessionUser } />}

      <main>
        <section>
          <h4 className="admin-page-title">Cadastrar novo usuário</h4>
          <form className="admin-register-form">
            <Input
              labelText="Nome"
              type="text"
              dataTestId="admin_manage__input-name"
              placeHolder="Nome e sobrenome"
              onChange={ (e) => setName(e.target.value) }
            />
            <Input
              labelText="Email"
              type="text"
              dataTestId="admin_manage__input-email"
              placeHolder="seuemail@site.com"
              onChange={ (e) => setEmail(e.target.value) }
            />
            <Input
              labelText="Senha"
              type="password"
              dataTestId="admin_manage__input-password"
              placeHolder="******"
              onChange={ (e) => setPassword(e.target.value) }
            />
            <Select
              name="role"
              labelText="Tipo"
              dataTestId="admin_manage__select-role"
              options={ ROLE_OPTIONS }
              onChange={ (e) => setRole(e.target.value) }
            />
            <Button
              text="CADASTRAR"
              dataTestId="admin_manage__button-register"
              disabled={
                name.length < NAME_LENGTH
                || !EMAIL_REGEX.test(email)
                || password.length < PWD_LENGTH
              }
              onClick={ handleSubmit }
            />
          </form>
        </section>
        {
          error && (
            <h5
              className="register-error-message"
              data-testid="admin_manage__element-invalid-register"
            >
              Não foi possível realizar o cadastro
            </h5>
          )
        }

      </main>
    </>
  );
}
