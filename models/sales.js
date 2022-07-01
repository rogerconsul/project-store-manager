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

module.exports = {
  getAll,
  getById,
};