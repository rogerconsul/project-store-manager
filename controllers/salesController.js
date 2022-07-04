// const model = require('../models/sales');
const service = require('../services/salesService');
// const checkSales = require('../middlewares/salesControllerMid');

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

// const create = (checkSales, async (req, res) => {
//   const parametros = req.body;
//   parametros.foreach(async (element) => {
//     await service.create(element.productId, element.quantity);
//   });
//     return res.status(201).json({ message: 'chatubO' });

  // parametros.map(async (element) => {
  //   const { productId } = element;
  //   const { quantity } = element;
  //   if (!productId) {
  //     return res.status(400).json({ message: '"productId" is required' });
  //   }
  //   if (!quantity) {
  //     return res.status(400).json({ message: '"quantity" is required' });
  //   }
  //   const cria = await service.create(productId, quantity);
  //   if (!cria) {
  //     return res.status(404).json({ message: 'Product not found' });
  //   }
  // });
// });

module.exports = {
  getAll,
  getById,
  // create,
};