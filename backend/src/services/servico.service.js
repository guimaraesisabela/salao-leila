const servicoRepository = require('../repositories/servico.repository');

const criar = (dados) => servicoRepository.criar(dados);
const listar = () => servicoRepository.listar();
const buscarPorId = (id) => servicoRepository.buscarPorId(id);
const atualizar = (id, dados) => servicoRepository.atualizar(id, dados);
const remover = (id) => servicoRepository.remover(id);

module.exports = { criar, listar, buscarPorId, atualizar, remover };