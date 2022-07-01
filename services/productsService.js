const model = require('../models/products');

const remove = async (id) => {
  const bridge = await model.remove(id);
  return bridge;
};

module.exports = {
  remove,
};
