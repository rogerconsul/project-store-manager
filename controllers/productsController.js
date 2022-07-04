const service = require('../services/productsService');
const model = require('../models/products');

const remove = async (req, res) => {
  const { id } = req.params;
  const exclui = await service.remove(id);
  if (!exclui) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(204).end();
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const atualiza = await service.update(id, name);
  if (!atualiza) {
    return res.status(404).json({ message: 'Product not found' });
  }
  const atualizado = await model.getById({ id });
  return res.status(200).json(atualizado);
};

module.exports = {
  remove,
  update,
};