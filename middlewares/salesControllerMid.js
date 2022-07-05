const checkSales = async (body) => {
    const verifica = await body.map((element) => { // usar o newparams
      if (element.quantity < 1) {
        return { status: 422, message: '"quantity" must be greater than or equal to 1' };
      }
      if (!element.productId) {
        return { status: 400, message: '"productId" is required' };
      }
      if (!element.quantity) {
        return { status: 400, message: '"quantity" is required' };
      }
      return null;
    });
  return verifica;
  };

module.exports = checkSales;