const Servico = require('../models/servico.model');

const criar = (dados) => Servico.create(dados);
const listar = () => Servico.find({ ativo: true });
const buscarPorId = (id) => Servico.findById(id);
const atualizar = (id, dados) => Servico.findByIdAndUpdate(id, dados, { new: true });
const remover = (id) => Servico.findByIdAndUpdate(id, { ativo: false }, { new: true });

module.exports = { criar, listar, buscarPorId, atualizar, remover };