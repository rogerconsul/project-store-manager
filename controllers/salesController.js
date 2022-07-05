// const model = require('../models/sales');
const service = require('../services/salesService');
const checkSales = require('../middlewares/salesControllerMid');

const getAll = async (_req, res) => {
  try {
    const venda = await service.getAll();
    res.status(200).json(venda);
  } catch (error) {
    res.status(500).json({ message: 'GetAll Sales deu ruim' });
 }
};

const getById = async (req, res) => {
  const id = req.params;
  try {
    const sale = await service.getById(id);
    if (!sale || sale.length === 0) {
      return res.status(404).json({ message: 'Sale not found' });
    }
   return res.status(200).json(sale);
 } catch (error) {
    res.status(500).json({ message: 'getById Sales deu ruim' });
 }
};

const create = (async (req, res) => {
  const { body } = req;
  const verifica = await checkSales(body);
  const verifica2 = verifica.find((e) => e);
  if (verifica2) {
    return res.status(verifica2.status).json(verifica2.message);
  }
  const id = await service.manageDate();
  await service.create(id, body);
  const result = {
    id,
    itemsSold: body,
  };
  return res.status(201).json(result);
});

module.exports = {
  getAll,
  getById,
  create,
};