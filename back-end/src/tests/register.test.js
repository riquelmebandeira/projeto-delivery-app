const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');
const { User } = require('../database/models');
const usersMock = require('./mocks/users.json');

chai.use(chaiHttp);

const { expect } = chai;

describe('Ao requisitar a rota POST /users', () => {
  let chaiHttpResponse;

  describe('Enviando dados válidos e que não existem no database', () => {
    before(async () => {
      sinon.stub(User, "findOne").resolves(null);
      sinon.stub(User, "create").resolves({ dataValues: usersMock[3] });

      chaiHttpResponse = await chai
        .request(app)
        .post('/users')
        .send({
          name: 'Crash Test Dummy',
          email: 'test@dummy.com',
          password: '123456'
        });
    });
  
    after(() => { 
      (User.findOne).restore();
      (User.create).restore();
    })
  
    it('A resposta deve conter o código de status 201', () => {
      expect(chaiHttpResponse).to.have.status(201);
    });

    it('A requisição deve retornar um objeto no corpo da resposta', () => {
      expect(chaiHttpResponse.body).to.be.a('object');
    });

    it('Tal objeto deve possuir a propriedade token', () => {
      expect(chaiHttpResponse.body).to.be.have.property('token');
    });
  })

  describe('Enviando dados que já existem no database', () => {
    before(async () => {
      sinon.stub(User, "findOne").resolves({ dataValues: usersMock[3] });

      chaiHttpResponse = await chai
        .request(app)
        .post('/users')
        .send({
          name: 'Crash Test Dummy',
          email: 'test@dummy.com',
          password: '123456'
        });
    });
  
    after(() => { (User.findOne).restore() })
  
    it('A resposta deve conter o código de status 409', () => {
      expect(chaiHttpResponse).to.have.status(409);
    });

    it('A requisição deve retornar um objeto no corpo da resposta', () => {
      expect(chaiHttpResponse.body).to.be.a('object');
    });

    it('Tal objeto deve possuir a propriedade "message"', () => {
      expect(chaiHttpResponse.body).to.be.have.property('message');
    });

    it('A mensagem deve possuir o texto "User already registered"', () => {
      expect(chaiHttpResponse.body.message).to.equal('User already registered');
    });
  })

  describe('Enviando um nome com menos de 12 caracteres', () => {
    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/users')
        .send({
          name: 'Dummy',
          email: 'test@dummy.com',
          password: '123456'
        });
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

    it('A mensagem deve possuir o texto "name length must be 12 characters long"', () => {
      expect(chaiHttpResponse.body.message).to.equal('"name" length must be 12 characters long');
    });
  })

  describe('Enviando um email com formato inválido', () => {
    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/users')
        .send({
          name: 'Crash Test Dummy',
          email: 'invalid@format',
          password: '123456'
        });
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

    it('A mensagem deve possuir o texto "email must be a valid email"', () => {
      expect(chaiHttpResponse.body.message).to.equal('"email" must be a valid email');
    });
  })

  describe('Enviando um senha com menos de 6 caracteres', () => {
    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/users')
        .send({
          name: 'Crash Test Dummy',
          email: 'test@dummy.com',
          password: '123'
        });
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
      expect(chaiHttpResponse.body.message).to.equal('"password" length must be 6 characters long');
    });
  })
});
