const mongoose = require('mongoose');

const agendamentoSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  servicos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Servico', required: true }],
  dataHora: { type: Date, required: true },
  status: {
    type: String,
    enum: ['pendente', 'confirmado', 'cancelado', 'concluido'],
    default: 'pendente',
  },
  observacao: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Agendamento', agendamentoSchema);
