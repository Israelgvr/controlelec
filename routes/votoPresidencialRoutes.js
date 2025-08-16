const express = require('express');
const router = express.Router();
const controller = require('../controllers/votoPresidencialController');

// Ruta: /api/votos-presidenciales
router.post('/votospresidenciales', controller.crearVoto);
router.get('/votospresidenciales', controller.obtenerVotos);
router.get('/votospresidenciales/:id', controller.obtenerVotoPorId);
router.put('/votospresidenciales/:id', controller.actualizarVoto);
router.delete('/votospresidenciales/:id', controller.eliminarVoto);
//
router.get('/votospresidenciales/mesa/:mesaId', controller.obtenerVotoPorMesa);

router.get('/votospresidenciales/estado/:id', controller.obtenerVotoeEstado);


module.exports = router;
