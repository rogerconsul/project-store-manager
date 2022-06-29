const connection = require('./connection');

// Busca todos os produtos.

const getAll = async () => {
const [products] = await connection.query(
  'SELECT * FROM StoreManager.products;',
);
return products;
};

// busca produtos para um id.

const getById = async ({ id }) => {
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

module.exports = {
  getAll,
  getById,
  create,
};