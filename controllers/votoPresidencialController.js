const VotoPresidencial = require('../models/VotoPresidencial');

// Crear nuevo voto
exports.crearVoto = async (req, res) => {
    try {
        const { mesa } = req.body;

        // Verificar si ya existe un registro para esa mesa
        const existe = await VotoPresidencial.findOne({ mesa });
        if (existe) {
            return res.status(400).json({ msg: 'Ya existe un registro para esta mesa.' });
        }

        const nuevoVoto = new VotoPresidencial({ ...req.body, estado: true });
        await nuevoVoto.save();
        res.status(201).json(nuevoVoto);

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
