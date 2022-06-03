const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');
const { User } = require('../database/models');
const usersMock = require('./mocks/users.json');

chai.use(chaiHttp);

const { expect } = chai;

describe('Ao requisitar a rota POST /login', () => {
  let chaiHttpResponse;

  describe('Enviando dados válidos de um usuário existente', () => {
    before(async () => {
      sinon.stub(User, "findOne").resolves({ dataValues: usersMock[1] });

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'fulana@deliveryapp.com',
          password: 'fulana@123'
        });
    });
  
    after(() => { (User.findOne).restore() })
  
    it('A resposta deve conter o código de status 200', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('A requisição deve retornar um objeto no corpo da resposta', () => {
      expect(chaiHttpResponse.body).to.be.a('object');
    });

    it('Tal objeto deve possuir a propriedade token', () => {
      expect(chaiHttpResponse.body).to.be.have.property('token');
    });
  })

  describe('Enviando dados de um usuário inexistente', () => {
    before(async () => {
      sinon.stub(User, "findOne").resolves(null);

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'guest@guest.com',
          password: '123456'
        });
    });
  
    after(() => { (User.findOne).restore() })
  
    it('A resposta deve conter o código de status 404', () => {
      expect(chaiHttpResponse).to.have.status(404);
    });

    it('A requisição deve retornar um objeto no corpo da resposta', () => {
      expect(chaiHttpResponse.body).to.be.a('object');
    });

    it('Tal objeto deve possuir a propriedade "message"', () => {
      expect(chaiHttpResponse.body).to.be.have.property('message');
    });

    it('A mensagem deve possuir o texto "Invalid fields"', () => {
      expect(chaiHttpResponse.body.message).to.equal('Invalid fields');
    });
  })

  describe('Enviando uma senha incorreta', () => {
    before(async () => {
      sinon.stub(User, "findOne").resolves({ dataValues: usersMock[1] });

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'fulana@deliveryapp.com',
          password: 'wrongpassword'
        });
    });
  
    after(() => { (User.findOne).restore() })
  
    it('A resposta deve conter o código de status 400', () => {
      expect(chaiHttpResponse).to.have.status(400);
    });

    it('A requisição deve retornar um objeto no corpo da resposta', () => {
      expect(chaiHttpResponse.body).to.be.a('object');
    });

    it('Tal objeto deve possuir a propriedade "message"', () => {
      expect(chaiHttpResponse.body).to.be.have.property('message');
    });

    it('A mensagem deve possuir o texto "Invalid credentials"', () => {
      expect(chaiHttpResponse.body.message).to.equal('Invalid credentials');
    });
  })

  describe('E não enviar um email', () => {
    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({password: '123456'});
    });
  
    it('A resposta deve conter o código de status 400', () => {
      expect(chaiHttpResponse).to.have.status(400);
    });

    it('A requisição deve retornar um objeto no corpo da resposta', () => {
      expect(chaiHttpResponse.body).to.be.a('object');
    });

    it('Tal objeto deve possuir a propriedade "message"', () => {
      expect(chaiHttpResponse.body).to.be.have.property('message');
    });

    it('A mensagem deve possuir o texto "email is required"', () => {
      expect(chaiHttpResponse.body.message).to.equal('"email" is required');
    });
  })

  describe('E não enviar uma senha', () => {
    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({email: 'admin@admin.com'});
    });
  
    it('A resposta deve conter o código de status 400', () => {
      expect(chaiHttpResponse).to.have.status(400);
    });

    it('A requisição deve retornar um objeto no corpo da resposta', () => {
      expect(chaiHttpResponse.body).to.be.a('object');
    });

    it('Tal objeto deve possuir a propriedade "message"', () => {
      expect(chaiHttpResponse.body).to.be.have.property('message');
    });

    it('A mensagem deve possuir o texto "password is required"', () => {
      expect(chaiHttpResponse.body.message).to.equal('"password" is required');
    });
  })
});
