const { Router } = require('express');
const agendamentoController = require('../controllers/agendamento.controller');

const router = Router();

router.post('/', agendamentoController.criar);
router.get('/', agendamentoController.listar);
router.get('/cliente/:clienteId', agendamentoController.buscarPorCliente);
router.get('/:id', agendamentoController.buscarPorId);
router.put('/:id', agendamentoController.atualizar);

module.exports = router;