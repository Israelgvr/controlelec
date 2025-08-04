const express = require('express');
const router = express.Router();
const controller = require('../controllers/votoUninominalController');

// Usamos POST pero internamente verifica si actualiza o crea
router.post('/uninominal', controller.crearVoto);
router.get('/uninominal', controller.obtenerVotos);
router.get('/uninominal/:id', controller.obtenerVotoPorId);
router.put('/uninominal/:id', controller.actualizarVoto);
router.delete('/uninominal/:id', controller.eliminarVoto);
router.get('/uninominal/circunscripcion/:id', controller.obtenerResultadosPorCircunscripcion);

module.exports = router;
