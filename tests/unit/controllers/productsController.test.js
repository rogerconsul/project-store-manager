const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

const controller = require('../../../controllers/productsController');
const service = require('../../../services/productsService');

describe('productsController', () => {
  beforeEach(sinon.restore);

  describe('Testa o método REMOVE', () => {
    it('Deve disparar erro caso o service.remove dispare', () => {
      sinon.stub(service, 'remove').rejects();
      return chai.expect(controller.remove({}, {})).to.eventually.be.rejected
    })

    it('Deve resolver', async () => {
      sinon.stub(service, 'remove').resolves(1);
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
        end: sinon.stub().returns(),
      }
      await controller.remove({params: {id: 1}}, res)
      chai.expect(res.status.getCall(0).args[0]).to.equal(204)
    })

    it('Deve vir invalido na funcao exclui', async () => {
      sinon.stub(service, 'remove').resolves(false);
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns({ message: 'Product not found' }),
      }
      await controller.remove({params: {id: 1}}, res)
      chai.expect(res.status.getCall(0).args[0]).to.equal(404)
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal({ message: 'Product not found' })
    })
  })

  describe('Teste o método UPDATE', () => {
    it('Deve disparar erro caso o service.update dê erro', async () => {
      sinon.stub(service, 'update').rejects();
    })

    it('Deve vir invalido na funcao atualiza', async () => {
      sinon.stub(service, 'update').resolves(false);
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns({ message: 'Product not found' }),
      }
      await controller.update({ params: { id: 1 }, body: {name: 'Joelma'} }, res)
      chai.expect(res.status.getCall(0).args[0]).to.equal(404)
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal({ message: 'Product not found' })
    })
  })

    it('Deve resolver', async () => {
      sinon.stub(service, 'update').resolves(1);
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }
      const obj = {
        id: 1,
        name: 'Joelma',
      }
      await controller.update({ params: { id: 1 }, body: { name: 'Joelma' } }, res)
      chai.expect(res.status.getCall(0).args[0]).to.equal(200)
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal(obj)
    })
})