const model = require('../models/products');

const remove = async (id) => {
  const bridge = await model.remove(id);
  return bridge;
};

const update = async (id, payload) => {
  const bridge = await model.update(id, payload);
  return bridge;
};

module.exports = {
  remove,
  update,
};
