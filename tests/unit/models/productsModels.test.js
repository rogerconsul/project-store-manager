const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productsModels = require('../../../models/products');

const validObject = [
  {
    "id": 1,
    "name": "Martelo de Thor",
  },
  {
    "id": 2,
    "name": "Traje de encolhimento",
  }
]

const validObjectID1 = {
  "id": 1,
    "name": "Martelo de Thor",
}

describe('Verifica o product Model', () => {

  before(async () => {
    sinon.stub(connection, 'query').resolves([validObject]);
  });
  after(async () => {
    connection.query.restore();
  })

  it('Verifica se é possivel listar todos os produtos', async () => {
    const response = await productsModels.getAll()

    expect(response).to.equal(validObject);
  })

  it('Verifica se é possivel listar pelo ID', async () => {
    sinon.stub(productsModels, 'getById').resolves(validObjectID1)
    const response = await productsModels.getById(1);
    expect(response).to.equal(validObjectID1)
  })
})