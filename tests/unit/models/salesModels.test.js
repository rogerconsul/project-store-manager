const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/sales');

const validObject = [
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
];

const validObjectID1 = [
  {
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  }
];

describe('Verifica o product Sales', () => {

  before(async () => {
    sinon.stub(connection, 'execute').resolves([validObject]);
  });
  afterEach(async () => {
    sinon.restore();
  })

  it('Verifica se é possivel listar todas as vendas', async () => {
    const response = await salesModel.getAll()

    expect(response).to.equal(validObject);
  })

  it('Verifica se é possivel listar pelo ID', async () => {
    sinon.stub(connection, 'execute').resolves([validObjectID1])
    const response = await salesModel.getById(1);
    expect(response).to.equal(validObjectID1)
  })

  it('Verifica se não é possivel buscar um ID inexistente', async () => {
    sinon.stub(connection, 'execute').resolves([])
    const response = await salesModel.getById(999);
    expect(response).to.equal(undefined)
  })
})