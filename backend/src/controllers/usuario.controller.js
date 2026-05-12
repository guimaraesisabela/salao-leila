const usuarioService = require('../services/usuario.service');

const criar = async (req, res, next) => {
  try {
    const usuario = await usuarioService.criar(req.body);
    return res.status(201).json(usuario);
  } catch (error) {
    next(error);
  }
};

const listar = async (req, res, next) => {
  try {
    const usuarios = await usuarioService.listar();
    return res.json(usuarios);
  } catch (error) {
    next(error);
  }
};

const buscarPorId = async (req, res, next) => {
  try {
    const usuario = await usuarioService.buscarPorId(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
    return res.json(usuario);
  } catch (error) {
    next(error);
  }
};

module.exports = { criar, listar, buscarPorId };