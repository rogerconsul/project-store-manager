const errorMiddleware = async (err, req, res, _next) => {
  res.status(500).send({ err });
};

module.exports = errorMiddleware;