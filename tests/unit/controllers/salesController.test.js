const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

const controller = require('../../../controllers/salesController');
const service = require('../../../services/salesService');
const model = require('../../../models/sales');


describe('salesController', () => {
  beforeEach(sinon.restore);

  describe('Testa o método getAll', () => {
    it('Deve disparar erro caso o service.getAll dispare', () => {
      sinon.stub(service, 'getAll').rejects();
      return chai.expect(controller.getAll({}, {})).to.eventually.be.rejected
    })

    // it('Deve resolver', async () => {
    //   sinon.stub(service, 'remove').resolves();
    //   const res = {
    //     status: 204,
    //   }
    //   chai.expect(res.status).to.equal(204)
    // })
  })

  describe('Teste o método getById', () => {
    it('Deve disparar erro caso o service.getById dê erro', async () => {
      sinon.stub(service, 'getById').rejects();
      return chai.expect(controller.getById({}, {})).to.eventually.be.rejected
    })
  })

  describe('Teste o método create', () => {
    it('Deve disparar erro caso o idFinder dê erro', async () => {
      sinon.stub(model, 'idFinder').rejects();
      return chai.expect(controller.create({}, {})).to.eventually.be.rejected
    })

    it('Deve disparar erro caso o service.manageDate dê erro', async () => {
      sinon.stub(service, 'manageDate').rejects();
      return chai.expect(controller.create({}, {})).to.eventually.be.rejected
    })
  })
})