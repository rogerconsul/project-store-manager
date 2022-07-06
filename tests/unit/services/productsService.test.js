const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

const model = require('../../../models/products');
const service = require('../../../services/productsService');

describe('testa productsService', () => {
  beforeEach(sinon.restore);

  describe('testa a camada REMOVE', () => {
    it('Deve funcionar caso o model resolva', () => {
      sinon.stub(model, 'remove').resolves();
      return chai.expect(service.remove(1)).to.eventually.be.fulfilled
    })
  })
  
  describe('testa a camada UPDATE', () => {
    it('Deve disparar erro caso update rejeite', () => {
      sinon.stub(model, 'getById').resolves(false);
      return chai.expect(service.remove(1)).to.eventually.be.null
    })

    it('Deve retornar o esperado', () => {
      sinon.stub(model, 'getById').resolves(true);
      sinon.stub(model, 'update').resolves()
      return chai.expect(service.update({})).to.eventually.be.undefined
    })
 })
})

// it('Deve disparar erro caso o service.remove dispare', () => {
//   sinon.stub(service, 'remove').rejects();
//   return chai.expect(controller.remove({}, {})).to.eventually.be.rejected
// })