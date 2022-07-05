const model = require('../models/sales');

const getAll = async () => {
  const bridge = await model.getAll();
  return bridge;
};

const getById = async (id) => {
  const bridge = await model.getById(id);
  return bridge;
};

const create = async (prodId, payload) => {
  const find = await model.idFinder();
  const found = payload.some((element) =>
    find.includes(element.productId));
  
  if (!found || !find) {
    throw Error;
  } else {
    const exec = await model.create(prodId, payload);
    return exec;
  }
};

const manageDate = async () => {
  const bridge = await model.manageDate();
  return bridge;
};

module.exports = {
  getAll,
  getById,
  create,
  manageDate,
};
