const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');
const { User, Sale, SaleProduct } = require('../database/models');
const { sales, salesProducts } = require('./mocks');
const [admin, seller, customer] = require('./mocks/users.json');
const { generateToken } = require('../utils/generateToken');

chai.use(chaiHttp);

const { expect } = chai;

describe('Ao requisitar a rota GET /sales', () => {
  let chaiHttpResponse;

  describe('Enviando um token de autorização válido', () => {
    before(async () => {
      sinon.stub(Sale, "findAll").resolves(sales);
      sinon.stub(User, "findOne").resolves({ dataValues: customer });

      chaiHttpResponse = await chai
        .request(app)
        .get('/sales')
        .set({ authorization: await generateToken(customer) });
    });
  
    after(() => {
      (Sale.findAll).restore();
      (User.findOne).restore();
      })
  
    it('A resposta deve conter o código de status 200', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('A requisição deve retornar um array de vendas', () => {
      expect(chaiHttpResponse.body).to.be.deep.equal(sales);
    });
  })

  describe('Sem enviar um token', () => {
    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/sales')
    });
  
    it('A resposta deve conter o código de status 401', () => {
      expect(chaiHttpResponse).to.have.status(401);
    });

    it('A requisição deve retornar um objeto no corpo da resposta', () => {
      expect(chaiHttpResponse.body).to.be.a('object');
    });

    it('Tal objeto deve possuir a propriedade "message"', () => {
      expect(chaiHttpResponse.body).to.be.have.property('message');
    });

    it('A mensagem deve possuir o texto "Token not found"', () => {
      expect(chaiHttpResponse.body.message).to.equal('Token not found');
    });
  })
});

describe('Ao requisitar a rota GET /sales/:id', () => {
  let chaiHttpResponse;

  describe('Enviando um token de autorização válido', () => {
    before(async () => {
      sinon.stub(Sale, "findOne").resolves(salesProducts);
      sinon.stub(User, "findOne").resolves({ dataValues: customer });

      chaiHttpResponse = await chai
        .request(app)
        .get('/sales/1')
        .set({ authorization: await generateToken(customer) });
    });
  
    after(() => {
      (Sale.findOne).restore();
      (User.findOne).restore();
      })
  
    it('A resposta deve conter o código de status 200', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('A requisição deve retornar o objeto da venda', () => {
      expect(chaiHttpResponse.body).to.be.deep.equal(salesProducts);
    });
  })

  describe('Sem enviar um token', () => {
    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/sales/1')
    });
  
    it('A resposta deve conter o código de status 401', () => {
      expect(chaiHttpResponse).to.have.status(401);
    });

    it('A requisição deve retornar um objeto no corpo da resposta', () => {
      expect(chaiHttpResponse.body).to.be.a('object');
    });

    it('Tal objeto deve possuir a propriedade "message"', () => {
      expect(chaiHttpResponse.body).to.be.have.property('message');
    });

    it('A mensagem deve possuir o texto "Token not found"', () => {
      expect(chaiHttpResponse.body.message).to.equal('Token not found');
    });
  })
});

describe('Ao requisitar a rota PUT /sales/:id', () => {
  let chaiHttpResponse;

  describe('Enviando um token de autorização válido', () => {
    before(async () => {
      sinon.stub(User, "findOne").resolves({ dataValues: customer });
      sinon.stub(Sale, "update").resolves(null);
      sinon.stub(Sale, "findOne").resolves(salesProducts);

      chaiHttpResponse = await chai
        .request(app)
        .put('/sales/1')
        .set({ authorization: await generateToken(customer) });
    });
  
    after(() => {
      (Sale.update).restore();
      (Sale.findOne).restore();
      (User.findOne).restore();
      })
  
    it('A resposta deve conter o código de status 200', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('A requisição deve retornar o objeto da venda', () => {
      expect(chaiHttpResponse.body).to.be.deep.equal(salesProducts);
    });
  })

  describe('Sem enviar um token', () => {
    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .put('/sales/1')
    });
  
    it('A resposta deve conter o código de status 401', () => {
      expect(chaiHttpResponse).to.have.status(401);
    });

    it('A requisição deve retornar um objeto no corpo da resposta', () => {
      expect(chaiHttpResponse.body).to.be.a('object');
    });

    it('Tal objeto deve possuir a propriedade "message"', () => {
      expect(chaiHttpResponse.body).to.be.have.property('message');
    });

    it('A mensagem deve possuir o texto "Token not found"', () => {
      expect(chaiHttpResponse.body.message).to.equal('Token not found');
    });
  })
});

describe('Ao requisitar a rota POST /sales', () => {
  let chaiHttpResponse;

  describe('Enviando dados válidos', () => {
    before(async () => {
      sinon.stub(User, "findOne").resolves({ dataValues: customer });
      sinon.stub(Sale, "create").resolves({ dataValues: sales[3] });
      sinon.stub(SaleProduct, "bulkCreate").resolves(null);

      chaiHttpResponse = await chai
        .request(app)
        .post('/sales')
        .set({ authorization: await generateToken(customer) })
        .send({
            "sellerId": 2,
            "deliveryAddress": "Rua 09, Nova Cidade, Escada",
            "deliveryNumber": "42",
            "products": [
              {
                "id": 11,
                "name": "Stella Artois 275ml",
                "price": "3.49",
                "url_image": "http://localhost:3001/images/stella_artois_275ml.jpg",
                "quantity": 2
              }
            ]
        })
    });
  
    after(() => {
      (User.findOne).restore();
      (Sale.create).restore();
      (SaleProduct.bulkCreate).restore();
    })
  
    it('A resposta deve conter o código de status 201', () => {
      expect(chaiHttpResponse).to.have.status(201);
    });

    it('A requisição deve retornar o objeto da venda', () => {
      expect(chaiHttpResponse.body).to.be.deep.equal(sales[3]);
    });
  })

  describe('Sem enviar um token', () => {
    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/sales')
    });
  
    it('A resposta deve conter o código de status 401', () => {
      expect(chaiHttpResponse).to.have.status(401);
    });

    it('A requisição deve retornar um objeto no corpo da resposta', () => {
      expect(chaiHttpResponse.body).to.be.a('object');
    });

    it('Tal objeto deve possuir a propriedade "message"', () => {
      expect(chaiHttpResponse.body).to.be.have.property('message');
    });

    it('A mensagem deve possuir o texto "Token not found"', () => {
      expect(chaiHttpResponse.body.message).to.equal('Token not found');
    });
  })
});