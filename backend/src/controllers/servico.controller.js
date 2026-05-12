const servicoService = require('../services/servico.service');

const criar = async (req, res, next) => {
  try {
    const servico = await servicoService.criar(req.body);
    return res.status(201).json(servico);
  } catch (error) {
    next(error);
  }
};

const listar = async (req, res, next) => {
  try {
    const servicos = await servicoService.listar();
    return res.json(servicos);
  } catch (error) {
    next(error);
  }
};

const atualizar = async (req, res, next) => {
  try {
    const servico = await servicoService.atualizar(req.params.id, req.body);
    return res.json(servico);
  } catch (error) {
    next(error);
  }
};

const remover = async (req, res, next) => {
  try {
    await servicoService.remover(req.params.id);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = { criar, listar, atualizar, remover };