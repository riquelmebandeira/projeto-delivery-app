const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');
const { Product, User } = require('../database/models');
const productsMock = require('./mocks/products.json');
const [_admin, _seller, customer] = require('./mocks/users.json');
const { generateToken } = require('../utils/generateToken');

chai.use(chaiHttp);

const { expect } = chai;

describe('Ao requisitar a rota GET /products', () => {
  let chaiHttpResponse;

  describe('Enviando um token de autorização válido', () => {
    before(async () => {
      sinon.stub(Product, "findAll").resolves(productsMock);
      sinon.stub(User, "findOne").resolves(customer);

      chaiHttpResponse = await chai
        .request(app)
        .get('/products')
        .set({ authorization: await generateToken(customer) });
    });
  
    after(() => {
      (Product.findAll).restore();
      (User.findOne).restore();
      })
  
    it('A resposta deve conter o código de status 200', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('A requisição deve retornar um array de produtos', () => {
      expect(chaiHttpResponse.body).to.be.deep.equal(productsMock);
    });
  })

  describe('Sem enviar um token', () => {
    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/products')
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
