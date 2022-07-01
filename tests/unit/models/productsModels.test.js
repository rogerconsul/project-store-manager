const { expect } = require('chai');
const { beforeEach, afterEach } = require('mocha');
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

const validObjectID1 = [{
  "id": 1,
    "name": "Martelo de Thor",
}]

const validPayload = {
  "name": "Pão com Ovo"
}

const validResponseAtCreation = {
  "id": 4,
  "name": "Pão com Ovo"
}

describe('Verifica o product Model', () => {

  beforeEach(async () => {
    sinon.stub(connection, 'query').resolves([validObject]);
  });
  afterEach(async () => {
    sinon.restore();
  })

  it('Verifica se é possivel listar todos os produtos', async () => {
    const response = await productsModels.getAll()

    expect(response).to.equal(validObject);
  })

  it('Verifica se é possivel listar pelo ID', async () => {
    sinon.stub(connection, 'execute').resolves([validObjectID1])
    const response = await productsModels.getById(1);
    expect(response).to.equal(validObjectID1[0])
  })

  it('verifica se o retorno é um array', async () => {
    const response = await productsModels.getAll();
    expect(response).to.be.a('array')
  })
})

describe('Verifica se é possivel criar um produto', async () => {
  beforeEach(async () => {
    sinon.stub(connection, 'execute').resolves([validResponseAtCreation]);
  });
  afterEach(async () => {
    sinon.restore();
  })

  it('Sucesso ao inserir um payload válido', async () => {
    await productsModels.create(validPayload);
    const mountedObject = {
      id: validResponseAtCreation.id,
      name: validResponseAtCreation.name,
    };
    expect(mountedObject).to.eql(validResponseAtCreation)
  })
})


/*
const create = async (payload) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [product] = await connection.execute(query, [payload]);
  const mountedObject = {
    id: product.insertId,
    name: payload,
  };
  return mountedObject;
};
*/