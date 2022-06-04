const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');
const { User, Sale } = require('../database/models');
const { sales: [ pendingSale, inPreparationSale ] } = require('./mocks');
const [_admin, seller, _customer] = require('./mocks/users.json');
const { generateToken } = require('../utils/generateToken');

chai.use(chaiHttp);

const { expect } = chai;

describe('Ao requisitar a rota PUT /sales/:id', () => {
  let chaiHttpResponse;
  const spy = sinon.spy(Sale, "update");

  describe('Em uma venda que possui o status "Pendente"', () => {
    before(async () => {
      sinon.stub(User, "findOne").resolves({ dataValues: seller });
      sinon.stub(Sale, "findOne").resolves(pendingSale);

      chaiHttpResponse = await chai
        .request(app)
        .put('/sales/1')
        .set({ authorization: await generateToken(seller) });
    });
  
    after(() => {
      (User.findOne).restore();
      (Sale.findOne).restore();
    })
  
    it('É chamado o método update com o valor "Preparando"', () => {
      sinon.assert.calledWith(spy, sinon.match({ status: 'Preparando' }));
    });
  })


  describe('Em uma venda que possui o status "Preparando"', () => {
    before(async () => {
      sinon.stub(User, "findOne").resolves({ dataValues: seller });
      sinon.stub(Sale, "findOne").resolves(inPreparationSale);

      chaiHttpResponse = await chai
        .request(app)
        .put('/sales/1')
        .set({ authorization: await generateToken(seller) });
    });
  
    after(() => {
      (User.findOne).restore();
      (Sale.findOne).restore();
    })
  
    it('É chamado o método update com o valor "Em Trânsito"', () => {
      sinon.assert.calledWith(spy, sinon.match({ status: 'Em Trânsito' }));
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
