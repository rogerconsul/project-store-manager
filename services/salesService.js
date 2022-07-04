const model = require('../models/sales');

const getAll = async () => {
  const bridge = await model.getAll();
  return bridge;
};

const getById = async (id) => {
  const bridge = await model.getById(id);
  return bridge;
};

const create = async (prodId, qtty) => {
  const bridge = await model.create(prodId, qtty);
  return bridge;
};

module.exports = {
  getAll,
  getById,
  create,
};
