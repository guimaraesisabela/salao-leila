const { Router } = require('express');
const servicoController = require('../controllers/servico.controller');

const router = Router();

router.post('/', servicoController.criar);
router.get('/', servicoController.listar);
router.put('/:id', servicoController.atualizar);
router.delete('/:id', servicoController.remover);

module.exports = router;