  const checkSales = (req, res, next) => {
    const parametros = req.params;
    parametros.map((element) => {
      if (element.quantity < 1) {
        return res.status(422).json({ message: '\'quantity\' must be greater than or equal to 1' });
      }
      if (!element.productId) {
        return res.status(400).json({ message: '"productId" is required' });
      }
      if (!element.quantity) {
        return res.status(400).json({ message: '"quantity" is required' });
      }
      return true;
    });
    next();
  };

module.exports = checkSales;