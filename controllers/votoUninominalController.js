const VotoUninominal = require('../models/VotoUninominal');

// Crear nuevo voto uninominal
exports.crearVoto = async (req, res) => {
    try {
        const { mesa } = req.body;

        // Buscar si ya existe un registro para esa mesa
        const votoExistente = await VotoUninominal.findOne({ mesa });

        if (votoExistente) {
            // Si existe, actualizarlo
            const votoActualizado = await VotoUninominal.findOneAndUpdate(
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
        const nuevoVoto = new VotoUninominal({ ...req.body, estado: true });
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
        const votos = await VotoUninominal.find().populate('mesa');
        res.json(votos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener voto por ID
exports.obtenerVotoPorId = async (req, res) => {
    try {
        const voto = await VotoUninominal.findById(req.params.id).populate('mesa');
        if (!voto) return res.status(404).json({ msg: 'Voto no encontrado' });
        res.json(voto);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar voto
exports.actualizarVoto = async (req, res) => {
    try {
        const voto = await VotoUninominal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!voto) return res.status(404).json({ msg: 'Voto no encontrado' });
        res.json(voto);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar voto
exports.eliminarVoto = async (req, res) => {
    try {
        const voto = await VotoUninominal.findByIdAndDelete(req.params.id);
        if (!voto) return res.status(404).json({ msg: 'Voto no encontrado' });
        res.json({ msg: 'Voto eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//REPORTES
exports.obtenerResultadosPorCircunscripcion = async (req, res) => {
    try {
        const idCircunscripcion = parseInt(req.params.id); // por ejemplo: /resultados/circunscripcion/20

        const resultados = await VotoUninominal.aggregate([
            {
                $lookup: {
                    from: 'mesas',
                    localField: 'mesa',
                    foreignField: '_id',
                    as: 'mesa'
                }
            },
            { $unwind: '$mesa' },
            {
                $match: {
                    'mesa.circunscripcion.id': idCircunscripcion
                }
            },
            {
                $group: {
                    _id: null,
                    AP: { $sum: '$votos.AP' },
                    LYP: { $sum: '$votos.LYP' },
                    ADN: { $sum: '$votos.ADN' },
                    APB: { $sum: '$votos.APB' },
                    SUMATE: { $sum: '$votos.SUMATE' },
                    NGP: { $sum: '$votos.NGP' },
                    LIBRE: { $sum: '$votos.LIBRE' },
                    FP: { $sum: '$votos.FP' },
                    MAS_IPSP: { $sum: '$votos.MAS_IPSP' },
                    MORENA: { $sum: '$votos.MORENA' },
                    UNIDAD: { $sum: '$votos.UNIDAD' },
                    PDC: { $sum: '$votos.PDC' }
                }
            },
            {
                $project: {
                    _id: 0,
                    resultados: [
                        { partido: "AP", votos: "$AP" },
                        { partido: "LYP", votos: "$LYP" },
                        { partido: "ADN", votos: "$ADN" },
                        { partido: "APB", votos: "$APB" },
                        { partido: "SUMATE", votos: "$SUMATE" },
                        { partido: "NGP", votos: "$NGP" },
                        { partido: "LIBRE", votos: "$LIBRE" },
                        { partido: "FP", votos: "$FP" },
                        { partido: "MAS_IPSP", votos: "$MAS_IPSP" },
                        { partido: "MORENA", votos: "$MORENA" },
                        { partido: "UNIDAD", votos: "$UNIDAD" },
                        { partido: "PDC", votos: "$PDC" }
                    ]
                }
            },
            {
                $unwind: '$resultados'
            },
            {
                $sort: {
                    'resultados.votos': -1
                }
            },
            {
                $group: {
                    _id: null,
                    resultados: { $push: '$resultados' }
                }
            }
        ]);

        res.json(resultados[0]?.resultados || []);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
