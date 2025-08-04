const Mesa = require('../models/mesa');
const mongoose = require("mongoose");

exports.crearMesa = async (req, res) => {
    try {
        const nuevaMesa = new Mesa(req.body);
        await nuevaMesa.save();
        res.status(201).json(nuevaMesa);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.obtenerMesa = async (req, res) => {
    try {
        const mesa = await Mesa.findOne({ codigoMesa: req.params.codigoMesa });
        if (!mesa) return res.status(404).json({ msg: 'Mesa no encontrada' });
        res.json(mesa);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// controllers/mesaController.js
exports.obtenerMesasPaginadas = async (req, res) => {
    try {
        // Obtener los parámetros de la query (por defecto: página 1, 20 por página)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;

        const skip = (page - 1) * limit;

        // Buscar mesas con paginación
        const mesas = await Mesa.find().skip(skip).limit(limit);

        // Obtener total de mesas para frontend
        const totalMesas = await Mesa.countDocuments();

        res.json({
            page,
            limit,
            totalPages: Math.ceil(totalMesas / limit),
            totalMesas,
            data: mesas
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMesaPorNumMesa = async (req, res) => {
    try {
        const numMesa = mongoose.Types.Long.fromString(req.params.numMesa);

        const mesa = await Mesa.findOne({ numMesa });
        if (!mesa) {
            return res.status(404).json({ message: 'Mesa no encontrada' });
        }

        res.json(mesa);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar la mesa', error });
    }
};

exports.listarMesas = async (req, res) => {
    try {
        const mesas = await Mesa.find();
        res.json(mesas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
