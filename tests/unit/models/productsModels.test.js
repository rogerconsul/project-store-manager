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

describe('Verifica o product Model', () => {
  before(async () => {
    sinon.stub(connection, 'execute').resolves(validObject);
  });
  after(async () => {
    connection.execute.restore();
  })

  it('Verifica se é possivel listar todos os produtos', async () => {
    const response = await productsModels.getAll()

    expect(response).to.be.a('object');
  })
})