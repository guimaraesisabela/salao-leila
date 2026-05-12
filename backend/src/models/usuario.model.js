const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefone: { type: String, required: true },
  tipo: { type: String, enum: ['cliente', 'admin'], default: 'cliente' },
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);