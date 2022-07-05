const connection = require('./connection');

// Busca todos os produtos.

const getAll = async () => {
const [products] = await connection.query(
  'SELECT * FROM StoreManager.products;',
);
return products;
};

// busca produtos para um id.

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [[product]] = await connection.execute(query, [id]);
  return product;
};

// cria um produto

const create = async (payload) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [product] = await connection.execute(query, [payload]);
  const mountedObject = {
    id: product.insertId,
    name: payload,
  };
  return mountedObject;
};

const remove = async (id) => {
  const query = `
  DELETE FROM StoreManager.products WHERE (id = ?);
  `;
  const produto = await getById({ id });
  if (!produto) {
    return null;
  }
  const remocao = await connection.execute(query, [id]);
  return remocao;
};

const update = async (id, payload) => {
  const query = `
  UPDATE StoreManager.products
  SET name = ?
  WHERE id = ?
  `;
  const atualiza = await connection.execute(query, [payload, id]);
  return atualiza;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};