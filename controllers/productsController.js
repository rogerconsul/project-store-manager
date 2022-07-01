const model = require('../models/products');

const remove = async (req, res) => {
  const { id } = req.params;
  const exclui = await model.remove(id);
  if (!exclui) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(204).end();
};

module.exports = {
  remove,
};