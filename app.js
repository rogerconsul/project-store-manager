const express = require('express');
const bodyParser = require('body-parser');
const products = require('./models/products');
const checkNameInput = require('./middlewares/checkNameInput');
const errorMiddleware = require('./middlewares/errorMiddleware');
const sales = require('./controllers/salesController');
const productsController = require('./controllers/productsController');

const app = express();

app.use(bodyParser.json());

app.get('/products', async (req, res) => {
  try {
    const produtos = await products.getAll();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).send({ message: 'GetAll deu errado.' });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const id = req.params;
    const produto = await products.getById(id);
    if (!produto) {
      return res.status(404).send({ message: 'Product not found' });
    }
   return res.status(200).json(produto);
  } catch (error) {
    res.status(404).send({ message: 'Product not found' });
  }
});

app.post('/products', checkNameInput, async (req, res) => {
  try {
    const { name } = req.body;
    const product = await products.create(name);
    return res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/sales', sales.getAll);

app.get('/sales/:id', sales.getById);

app.delete('/products/:id', productsController.remove);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(errorMiddleware);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;