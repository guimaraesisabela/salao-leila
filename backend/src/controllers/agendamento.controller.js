const agendamentoService = require('../services/agendamento.service');

const criar = async (req, res, next) => {
  try {
    const resultado = await agendamentoService.criar(req.body);
    return res.status(201).json(resultado);
  } catch (error) {
    next(error);
  }
};

const listar = async (req, res, next) => {
  try {
    const agendamentos = await agendamentoService.listar();
    return res.json(agendamentos);
  } catch (error) {
    next(error);
  }
};

const buscarPorCliente = async (req, res, next) => {
  try {
    const agendamentos = await agendamentoService.buscarPorCliente(req.params.clienteId);
    return res.json(agendamentos);
  } catch (error) {
    next(error);
  }
};

const buscarPorId = async (req, res, next) => {
  try {
    const agendamento = await agendamentoService.buscarPorId(req.params.id);
    if (!agendamento) return res.status(404).json({ error: 'Agendamento não encontrado' });
    return res.json(agendamento);
  } catch (error) {
    next(error);
  }
};

const atualizar = async (req, res, next) => {
  try {
    const isCliente = req.query.isCliente === 'true';
    const agendamento = await agendamentoService.atualizar(req.params.id, req.body, isCliente);
    return res.json(agendamento);
  } catch (error) {
    next(error);
  }
};

module.exports = { criar, listar, buscarPorCliente, buscarPorId, atualizar };