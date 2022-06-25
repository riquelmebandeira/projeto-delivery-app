# Projeto Delivery App

# Contexto
Este projeto é uma aplicação full-stack de um delivery de bebidas, desenvolvida com a stack SERN (SQL, Express.js, React.js, Node.js) e integrada com o Docker Compose. Também tivemos como base um protótipo no Figma para o layout das telas, e aplicamos as metódologias ágeis: SCRUM e Kanban.

Na aplicação existem 3 fluxos possíveis:

* Cliente: pode fazer pedidos, acompanhá-los e sinalizar ao recebê-los.

* Vendedor: pode acompanhar os pedidos recebidos e alterar seus status até o momento de envio.

* Administrador: pode cadastrar novos clientes ou vendedores.

Minha maior contribuição ao nosso grupo foi o desenvolvimento, em conjunto com o Pablo Assunção, do back-end do projeto.

![Preview da aplicação](preview.gif)

# Tecnologias usadas

* React
* Redux
* Node.js
* Express
* Sequelize
* MySQL
* Docker

<br>

# Orientações

<details>
  <summary><strong>Rodando o projeto</strong></summary><br />

  1. Clone o repositório:
  ```
  git clone git@github.com:riquelmebandeira/projeto-delivery-app.git
  ```

  2. Entre na pasta do repositório clonado:
  ```
  cd projeto-delivery-app
  ```

  3. Instale as aplicações com o comando:
  ```
  npm run install:apps
  ```
  
  4. Configure um arquivo __.env__ a partir do modelo disponível em __back-end/.env.example__

  5. Rode o back-end com o comando:
  ```
  cd backend
  npm start
  ```

  6. Rode o front-end com o comando:
  ```
  cd frontend
  npm start
  ```

<br>

</details>

<details>
  <summary><strong>Rodando o projeto com o Docker</strong></summary><br />

  1. Clone o repositório:
  ```
  git clone git@github.com:riquelmebandeira/projeto-delivery-app.git
  ```

  2. Entre na pasta do repositório clonado:
  ```
  cd projeto-delivery-app
  ```

  3. Suba as aplicações com o comando:
  ```
    npm run compose:up
  ```

  A interface ficará acessível no endereço: http://localhost:3000

  Para encerrar as aplicações, execute:

  ```
  npm run compose:down
  ```
  ---

</details>

<details>
  <summary><strong>Explorando diferentes fluxos</strong></summary><br />
    Para testar a aplicação como cliente, você pode realizar seu cadastro na página inicial da aplicação. Caso queira testar outros fluxos:

  - Faça login com a vendedora "Fulana Pereira" utilizando o e-mail `fulana@deliveryapp.com` e senha `fulana@123`

  - Faça login como pessoa administradora utilizando o e-mail `adm@deliveryapp.com` e a senha `--adm2@21!!--`
</details>

<br>

# Rotas
<details>
  <summary><strong>:unlock: Aviso</strong></summary><br />

  Algumas das rotas que você encontrará nas seções abaixo conterão este cadeado :lock: ao lado de sua declaração. 
  
  Isso indica que essa rota é protegida e espera receber um token válido — que pode ser obtido nos endpoints POST /login e POST /users — nos headers da requisição.

  ```json
  {
    "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6IlJpcXVlbG1lIEJhbmRlaXJhIiwiZW1haWwiOiJyaXF1ZWxtZUBiYW5kZWlyYS5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NTQ0NjE4ODAsImV4cCI6MTY1NDU0ODI4MH0.pAIjh_ZqR-6mMAUoYGnGDnTPJU_NE66GqZtrX3tG_Zc"
  }
  ```
</details>


<details>
  <summary><strong>/login</strong></summary><br />

* `POST /login` <br />

  Espera esta estrutura no body da requisição:
  ```json
  {
    "email": "adm@deliveryapp.com",
    "password": "--adm2@21!!--"
  }
  ``` 
  
  Retorna:
  ```json
  {
    "token": "eyJhbGciOeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."
  }
  ``` 
  HTTP STATUS: `200 OK`

<br />

* `GET /login/authenticate` :lock: <br />

  Retorna:
  ```json
  {
	"role": "administrator"
  }
  ``` 
  HTTP STATUS: `200 OK`

</details>

<details>
  <summary><strong>/users</strong></summary><br />

* `POST /users`

  Espera esta estrutura no body da requisição:
  ```json
  {
    "name": "Riquelme Bandeira",
    "email": "riquelme@bandeira.com",
    "password": "123456"
  }
  ``` 
  
   Retorna:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ``` 
  HTTP STATUS: `201 CREATED`

<br />

* `POST /users/admin` :lock:

  Espera esta estrutura no body da requisição:
  ```json
  {
    "name": "Pereira da Costa",
    "email": "pereira@dacosta.com",
    "password": "123456",
    "role": "seller" // pode definir o role do usuário
  }
  ``` 
  
   Retorna:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ``` 
  HTTP STATUS: `201 CREATED`

<br />

* `GET /users` :lock:

  Retorna:
  ```json
  [
    {
      "id": 1,
      "name": "Delivery App Admin",
      "email": "adm@deliveryapp.com",
      "role": "administrator"
    },
    {
      "id": 2,
      "name": "Fulana Pereira",
      "email": "fulana@deliveryapp.com",
      "role": "seller"
    },
    ...
  ]
  ``` 
  HTTP STATUS: `200 OK`

<br />

</details>  

<details>
  <summary><strong>/products</strong></summary><br />

* `GET /products` :lock:

  Retorna:
  ```json
  [
    {
      "id": 1,
      "name": "Skol Lata 250ml",
      "price": "2.20",
      "url_image": "http://localhost:3001/images/skol_lata_350ml.jpg"
    },
    {
      "id": 2,
      "name": "Heineken 600ml",
      "price": "7.50",
      "url_image": "http://localhost:3001/images/heineken_600ml.jpg"
    },
    ...
  ]
  ``` 
  
  HTTP STATUS: `200 OK`

<br />

</details>

<details>
  <summary><strong>/sales</strong></summary><br />

* `POST /sales` :lock:

  Espera esta estrutura no body da requisição:
  ```json
  {
    "sellerId": 2,
    "deliveryAddress": "Rua nova, Condor, Belém",
    "deliveryNumber": 55,
    "products": [
        {
          "id": 1,
          "name": "Skol Lata 250ml",
          "price": "2.20",
          "url_image": "http://localhost:3001/images/skol_lata_350ml.jpg",
          "quantity": 3
        },
        ...
    ]
  }
  ``` 
  
   Retorna:
  ```json
  {
    "saleDate": "2022-06-03T07:58:45.953Z",
    "status": "Pendente",
    "id": 1,
    "userId": 4,
    "sellerId": 2,
    "totalPrice": "29.10",
    "deliveryAddress": "Rua nova, Condor, Belém",
    "deliveryNumber": 55
  }
  ``` 
  HTTP STATUS: `201 CREATED`

<br />

* `GET /sales` :lock:

  Retorna:
  ```json
  [
    {
      "saleDate": "2022-06-03T07:58:45.953Z",
      "status": "Pendente",
      "id": 1,
      "userId": 4,
      "sellerId": 2,
      "totalPrice": "29.10",
      "deliveryAddress": "Rua nova, Condor, Belém",
      "deliveryNumber": 55
    },
    ...
  ]
  ```

  HTTP STATUS: `200 OK`

<br />

* `GET /sales/:id` :lock:

  Retorna:
  ```json
  {
    "id": 7,
    "userId": 4,
    "sellerId": 2,
    "totalPrice": "6.98",
    "deliveryAddress": "Rua nova, Condor, Belém",
    "deliveryNumber": "55",
    "saleDate": "2022-05-31T10:49:42.000Z",
    "status": "Em Trânsito",
    "seller": {
      "name": "Fulana Pereira"
    },
    "products": [
      {
        "id": 11,
        "name": "Stella Artois 275ml",
        "price": "3.49",
        "url_image": "http://localhost:3001/images/stella_artois_275ml.jpg",
        "SaleProduct": {
          "quantity": 2
        }
      }
    ]
  }
  ```

  HTTP STATUS: `200 OK`

<br />

* `PUT /sales/:id` :lock:

  O acesso a esta rota realiza uma atualização automática no "status" de uma compra. 

  As atualizações possíveis são: 
  - Quando vendedor: "Preparando", "Em Trânsito".
  - Quando cliente: "Entregue".

  <br>

  Retorna:
  ```json
  {
	"id": 1,
	"userId": 4,
	"sellerId": 2,
	"totalPrice": "9.70",
	"deliveryAddress": "Rua nova, Condor, Belém",
	"deliveryNumber": "55",
	"saleDate": "2022-05-06T01:39:58.000Z",
	"status": "Entregue"
  }
  ```

  HTTP STATUS: `200 OK`

</details>

