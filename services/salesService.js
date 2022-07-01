const model = require('../models/sales');

const getAll = async () => {
  const bridge = await model.getAll();
  return bridge;
};

const getById = async (id) => {
  const bridge = await model.getById(id);
  return bridge;
};

module.exports = {
  getAll,
  getById,
};
