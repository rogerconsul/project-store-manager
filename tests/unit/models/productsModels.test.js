const { expect } = require('chai');
const describe = require('mocha');
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
  before(() => {
    sinon.stub(productsModels, 'execute').resolves(validObject);
  });
  after(() => {
    sinon.stub.reset();
  })

  it('Verifica se é possivel listar todos os produtos', async () => {
    const response = await productsModels.getAll()

    expect(response).to.be.a('object');
    expect(response).to.equal(validObject);
  })
})