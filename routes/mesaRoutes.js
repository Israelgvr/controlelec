const express = require('express');
const router = express.Router();
const mesaController = require('../controllers/mesaController');

router.post('/mesas', mesaController.crearMesa);
router.get('/mesas', mesaController.listarMesas);
router.get('/paginadas', mesaController.obtenerMesasPaginadas);
router.get('/mesas/:codigoMesa', mesaController.obtenerMesa);
router.get('/mesas/num/:numMesa',mesaController.getMesaPorNumMesa);


module.exports = router;
