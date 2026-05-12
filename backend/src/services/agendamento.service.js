const agendamentoRepository = require('../repositories/agendamento.repository');

const obterInicioEFimDaSemana = (data) => {
  const d = new Date(data);
  const diaDaSemana = d.getDay();
  const inicioSemana = new Date(d);
  inicioSemana.setDate(d.getDate() - diaDaSemana);
  inicioSemana.setHours(0, 0, 0, 0);

  const fimSemana = new Date(inicioSemana);
  fimSemana.setDate(inicioSemana.getDate() + 6);
  fimSemana.setHours(23, 59, 59, 999);

  return { inicioSemana, fimSemana };
};

const criar = async (dados) => {
  const { cliente, dataHora } = dados;
  const dataAgendamento = new Date(dataHora);

  const { inicioSemana, fimSemana } = obterInicioEFimDaSemana(dataAgendamento);
  const agendamentosNaSemana = await agendamentoRepository.buscarPorClienteNaSemana(
    cliente,
    inicioSemana,
    fimSemana
  );

  let sugestaoData = null;
  if (agendamentosNaSemana.length > 0) {
    sugestaoData = agendamentosNaSemana[0].dataHora;
  }

  const agendamento = await agendamentoRepository.criar(dados);
  return { agendamento, sugestaoData };
};

const listar = () => agendamentoRepository.listar();
const buscarPorCliente = (clienteId) => agendamentoRepository.buscarPorCliente(clienteId);
const buscarPorId = (id) => agendamentoRepository.buscarPorId(id);

const atualizar = async (id, dados, isCliente = false) => {
  const agendamento = await agendamentoRepository.buscarPorId(id);
  if (!agendamento) throw { status: 404, message: 'Agendamento não encontrado' };

  if (isCliente) {
    const agora = new Date();
    const dataAgendamento = new Date(agendamento.dataHora);
    const diffEmMs = dataAgendamento - agora;
    const diffEmDias = diffEmMs / (1000 * 60 * 60 * 24);

    if (diffEmDias < 2) {
      throw {
        status: 400,
        message: 'Alterações com menos de 2 dias de antecedência devem ser feitas por telefone.',
      };
    }
  }

  return agendamentoRepository.atualizar(id, dados);
};

module.exports = { criar, listar, buscarPorCliente, buscarPorId, atualizar };