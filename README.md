# Projeto Delivery App

# Contexto
Este projeto é uma aplicação full-stack de um delivery de bebidas, desenvolvida com a stack SERN (SQL, Express.js, React.js, Node.js) e integrada com o Docker Compose.

Nela, existem 3 fluxos possíveis:

* Cliente: pode fazer pedidos, acompanhá-los e sinalizar ao recebê-los.

* Vendedor: pode acompanhar os pedidos recebidos e alterar seus status até o momento de envio.

* Administrador: pode cadastrar novos clientes ou vendedores.

O desenvolvimento foi feito aplicando as metodologias ágeis: SCRUM e Kanban.

## Tecnologias usadas

* React
* Redux
* Node.js
* Express
* Sequelize
* MySQL
* Mocha
* Chai
* Sinon
* Docker

## Instalando o projeto

1. Clone o repositório:

```
git clone git@github.com:riquelmebandeira/projeto-delivery-app.git
```

2. Entre na pasta do repositório clonado e instale as dependências:

```
cd projeto-delivery-app
```

3. Instale as aplicações front-end e back-end com o comando:

```
npm run install:apps
```


## Executando a aplicação

* Para rodar a aplicação, integrada pelo docker compose, utilize o comando:

```
npm run compose:up
```

Após isso, a aplicação pode ser acessada pelo endereço http://localhost:3000

* Para encerrar a aplicação, utilize o comando:

```
npm run compose:down
```
---
Para rodar as aplicações separadamente, é necessário criar e configurar um arquivo __.env__ a partir do modelo disponível em __back-end/.env.example__

---
* Para rodar o back-end, execute:

```
cd app/back-end
npm start
```

* Para rodar o front-end, execute:

```
cd app/front-end
npm start
```

## Explorando diferentes fluxos

Para testar a aplicação como cliente, você pode realizar seu cadastro na página inicial da aplicação. Caso queira testar outros fluxos:

- Faça login com a vendedora "Fulana Pereira" utilizando o e-mail `fulana@deliveryapp.com` e senha `fulana@123`

- Faça login utilizando dados da pessoa administradora utilizando o e-mail `adm@deliveryapp.com` e senha `--adm2@21!!--`