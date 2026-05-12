const { Router } = require('express');
const usuarioController = require('../controllers/usuario.controller');

const router = Router();

router.post('/', usuarioController.criar);
router.get('/', usuarioController.listar);
router.get('/:id', usuarioController.buscarPorId);

module.exports = router;