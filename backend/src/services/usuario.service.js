const usuarioRepository = require('../repositories/usuario.repository');

const criar = async (dados) => {
  const existente = await usuarioRepository.buscarPorEmail(dados.email);
  if (existente) throw { status: 400, message: 'E-mail já cadastrado' };
  return usuarioRepository.criar(dados);
};

const listar = () => usuarioRepository.listar();
const buscarPorId = (id) => usuarioRepository.buscarPorId(id);

module.exports = { criar, listar, buscarPorId };