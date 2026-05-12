const { Router } = require('express');
const usuarioRoutes = require('./usuario.routes');
const servicoRoutes = require('./servico.routes');
const agendamentoRoutes = require('./agendamento.routes');

const router = Router();

router.use('/usuarios', usuarioRoutes);
router.use('/servicos', servicoRoutes);
router.use('/agendamentos', agendamentoRoutes);

module.exports = router;