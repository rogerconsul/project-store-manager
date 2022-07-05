const connection = require('./connection');

const getAll = async () => {
  const query = `
    SELECT sal.id AS saleId, sal.date, sp.product_id AS productId, sp.quantity 
    FROM StoreManager.sales AS sal
    INNER JOIN StoreManager.sales_products AS sp
    ON sal.id = sp.sale_id
    ORDER BY sal.id, sp.product_id
  `;
  const [sales] = await connection.execute(query);
  return sales;
};

const getById = async ({ id }) => {
  const query = `
    SELECT sal.date, sp.product_id AS productId, sp.quantity 
    FROM StoreManager.sales AS sal 
    INNER JOIN StoreManager.sales_products AS sp 
    ON sal.id = sp.sale_id 
    AND sal.id = ? 
  `;
  const [sale] = await connection.execute(query, [id]);
  return sale;
};

const create = async (id, payload) => {
  const query = `
  INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES (?, ?, ?)
  `;
  payload.map(async (product) => {
    connection.execute(query, [id, product.productId, product.quantity]);
  });
};

const idFinder = async () => {
  const query = `
  SELECT id FROM StoreManager.products
  `;
  const [exec] = await connection.execute(query);
  const result = exec.map((e) => e.id);
  return result;
};

const manageDate = async () => {
  const query = `
  INSERT INTO StoreManager.sales (date) VALUES (now())
  `;
  const [exec] = await connection.execute(query);
  return exec.insertId;
};

module.exports = {
  getAll,
  getById,
  create,
  idFinder,
  manageDate,
};