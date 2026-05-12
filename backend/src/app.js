const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('API funcionando!');
});

module.exports = app;