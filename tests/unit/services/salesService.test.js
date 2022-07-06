const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

const model = require('../../../models/sales');
const service = require('../../../services/salesService');

describe('testa salesService', () => {
  beforeEach(sinon.restore);

  describe('testa a camada GETALL', () => {
    it('Deve funcionar caso o model resolva', () => {
      sinon.stub(model, 'getAll').resolves();
      return chai.expect(service.getAll()).to.eventually.be.fulfilled
    })
  })

  describe('testa a camada getById', () => {
    it('Deve disparar erro caso model.getById rejeite', () => {
      sinon.stub(model, 'getById').rejects();
      return chai.expect(service.getById(1)).to.eventually.be.rejected
    })
  })

  describe('testa a camada CREATE', () => {
    it('Deve disparar erro caso model.create rejeite', () => {
      sinon.stub(model, 'create').rejects();
      return chai.expect(service.create(1)).to.eventually.be.rejected
    })
  })

});