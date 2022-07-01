const model = require('../models/sales');

const getAll = async (_req, res) => {
  try {
    const venda = await model.getAll();
    res.status(200).json(venda);
  } catch (error) {
    res.status(500).json({ message: 'GetAll Sales deu ruim' });
 }
};

const getById = async (req, res) => {
  const id = req.params;
  try {
    const sale = await model.getById(id);
    if (!sale || sale.length === 0) {
      return res.status(404).json({ message: 'Sale not found' });
    }
   return res.status(200).json(sale);
 } catch (error) {
    res.status(500).json({ message: 'getById Sales deu ruim' });
 }
};

module.exports = {
  getAll,
  getById,
};