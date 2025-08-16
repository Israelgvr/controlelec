const mongoose = require('mongoose');
const VotoPresidencial = require('../models/VotoPresidencial');

// Crear o actualizar voto presidencial
exports.crearVoto = async (req, res) => {
    try {
        const { mesa } = req.body;

        // Buscar si ya existe un registro para esa mesa
        const votoExistente = await VotoPresidencial.findOne({ mesa });

        if (votoExistente) {
            // Si existe, actualizarlo
            const votoActualizado = await VotoPresidencial.findOneAndUpdate(
                { mesa },
                { ...req.body, estado: true },
                { new: true }
            );
            return res.status(200).json({
                mensaje: 'Voto actualizado correctamente',
                data: votoActualizado
            });
        }

        // Si no existe, crearlo
        const nuevoVoto = new VotoPresidencial({ ...req.body, estado: true });
        await nuevoVoto.save();

        res.status(201).json({
            mensaje: 'Voto registrado correctamente',
            data: nuevoVoto
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener todos los votos
exports.obtenerVotos = async (req, res) => {
    try {
        const votos = await VotoPresidencial.find().populate('mesa');
        res.json(votos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener voto por ID
exports.obtenerVotoPorId = async (req, res) => {
    try {
        const voto = await VotoPresidencial.findById(req.params.id).populate('mesa');
        if (!voto) return res.status(404).json({ msg: 'Voto no encontrado' });
        res.json(voto);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar voto
exports.actualizarVoto = async (req, res) => {
    try {
        const voto = await VotoPresidencial.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!voto) return res.status(404).json({ msg: 'Voto no encontrado' });
        res.json(voto);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar voto
exports.eliminarVoto = async (req, res) => {
    try {
        const voto = await VotoPresidencial.findByIdAndDelete(req.params.id);
        if (!voto) return res.status(404).json({ msg: 'Voto no encontrado' });
        res.json({ msg: 'Voto eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
/////////////////
// Obtener voto por mesa
exports.obtenerVotoPorMesa = async (req, res) => {
    try {
        const { mesaId } = req.params;

        const voto = await VotoPresidencial.findOne({ mesa: mesaId }).populate('mesa');

        if (!voto) return res.status(404).json({ msg: 'Voto no encontrado para esta mesa' });

        res.json(voto);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Ver solo el estado de un voto presidencial por mesa o ID
exports.obtenerVotoeEstado = async (req, res) => {
    try {
        const voto = await VotoPresidencial.findById(req.params.id).select('estado');
        if (!voto) {
            return res.status(404).json({ msg: 'Voto no encontrado' });
        }
        res.json({ estado: voto.estado });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

