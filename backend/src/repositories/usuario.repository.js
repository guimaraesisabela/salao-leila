const Usuario = require('../models/usuario.model');

const criar = (dados) => Usuario.create(dados);
const buscarPorEmail = (email) => Usuario.findOne({ email });
const buscarPorId = (id) => Usuario.findById(id);
const listar = () => Usuario.find();

module.exports = { criar, buscarPorEmail, buscarPorId, listar };