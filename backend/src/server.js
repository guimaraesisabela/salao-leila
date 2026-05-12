require('dotenv').config();
const app = require('./app');
const conectarBanco = require('./config/database');

const PORT = process.env.PORT || 3000;

const iniciar = async () => {
  await conectarBanco();
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
};

iniciar();