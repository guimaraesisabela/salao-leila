const Agendamento = require('../models/agendamento.model');

const criar = (dados) => Agendamento.create(dados);

const listar = () =>
  Agendamento.find().populate('cliente').populate('servicos');

const buscarPorId = (id) =>
  Agendamento.findById(id).populate('cliente').populate('servicos');

const buscarPorCliente = (clienteId) =>
  Agendamento.find({ cliente: clienteId }).populate('servicos');

const buscarPorClienteNaSemana = (clienteId, inicioSemana, fimSemana) =>
  Agendamento.find({
    cliente: clienteId,
    dataHora: { $gte: inicioSemana, $lte: fimSemana },
    status: { $ne: 'cancelado' },
  });

const atualizar = (id, dados) =>
  Agendamento.findByIdAndUpdate(id, dados, { new: true })
    .populate('cliente')
    .populate('servicos');

module.exports = {
  criar,
  listar,
  buscarPorId,
  buscarPorCliente,
  buscarPorClienteNaSemana,
  atualizar,
};