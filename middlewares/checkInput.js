const checkInput = (err, req, res, _next) => {
  const { name } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(err.status).json({ message: err.message });
  }
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: 'Erro não definido' });
};

module.exports = checkInput;