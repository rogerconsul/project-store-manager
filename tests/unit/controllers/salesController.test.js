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

    it('Deve resolver', async () => {
      sinon.stub(service, 'getAll').resolves();
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }
      await controller.getAll({}, res)
      chai.expect(res.status.getCall(0).args[0]).to.equal(200)
    })
  })

  describe('Teste o método getById', () => {
    it('Deve disparar erro caso o service.getById dê erro', async () => {
      sinon.stub(service, 'getById').rejects();
      return chai.expect(controller.getById({}, {})).to.eventually.be.rejected
    })

    it('caso o sale retorne nulo', async () => {
      sinon.stub(service, 'getById').resolves(false);
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns({ message: 'Sale not found' }),
      }
      await controller.getById({ params: { id: 1 } }, res)
      chai.expect(res.status.getCall(0).args[0]).to.equal(404)
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal({ message: 'Sale not found' })
    })

    it('Deve resolver', async () => {
      sinon.stub(service, 'getById').resolves(true);
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }
      await controller.getById({ params: { id: 1 } }, res)
      chai.expect(res.status.getCall(0).args[0]).to.equal(200)
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

    it('caso o idFinder nao ache nada', async () => {
      sinon.stub(model, 'idFinder').resolves(false);
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns({ message: 'Product not found' }),
      }
      await controller.create({ body: [{ productId: 1, quantity: 1 }] }, res)
      chai.expect(res.status.getCall(0).args[0]).to.equal(404)
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal({ message: 'Product not found' })
    })

    it('testa as validações do checkSales.productId', async () => {
      sinon.stub(model, 'idFinder').resolves(false);
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns({ message: 'Product not found' }),
      }
      await controller.create({ body: [{ xablau: 1, quantity: 1 }] }, res)
      chai.expect(res.status.getCall(0).args[0]).to.equal(400)
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal({ message: '"productId" is required' })
    })

    it('testa as validações do checkSales.quantity', async () => {
      sinon.stub(model, 'idFinder').resolves(false);
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns({ message: 'Product not found' }),
      }
      await controller.create({ body: [{ productId: 1, paoComOvo: 1 }] }, res)
      chai.expect(res.status.getCall(0).args[0]).to.equal(400)
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal({ message: '"quantity" is required' })
    })

    it('testa as validações do checkSales.quantity', async () => {
      sinon.stub(model, 'idFinder').resolves(false);
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns({ message: 'Product not found' }),
      }
      await controller.create({ body: [{ productId: 1, quantity: 0 }] }, res)
      chai.expect(res.status.getCall(0).args[0]).to.equal(422)
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal({ message: '"quantity" must be greater than or equal to 1' })
    })

    it('testa as validações do checkSales found/find', async () => {
      sinon.stub(model, 'idFinder').resolves(false);
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns({ message: 'Product not found' }),
      }
      await controller.create({ body: [{ productId: 1, quantity: 1 }] }, res)
      chai.expect(res.status.getCall(0).args[0]).to.equal(404)
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal({ message: 'Product not found' })
    })

    // it('testa as validações do create retornando certinho', async () => {
    //   sinon.stub(controller, 'verifica2').resolves(false);
    //   const res = {
    //     status: sinon.stub().callsFake(() => res),
    //     json: sinon.stub().returns({ message: 'Product not found' }),
    //   }
    //   await controller.create({ body: [{ productId: 1, quantity: 1 }] }, res)
    //   chai.expect(res.status.getCall(0).args[0]).to.equal(201)
    // })
  })
})