const mongoose = require('mongoose');

const VotoPresidencialSchema = new mongoose.Schema({
    mesa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mesa',
        required: true,
        unique: true,
        index: true
    },
    votos: {
        AP: { type: Number, default: 0 },
        LYP: { type: Number, default: 0 },
        ADN: { type: Number, default: 0 },
        APB: { type: Number, default: 0 },
        SUMATE: { type: Number, default: 0 },
        NGP: { type: Number, default: 0 },
        LIBRE: { type: Number, default: 0 },
        FP: { type: Number, default: 0 },
        MAS_IPSP: { type: Number, default: 0 },
        MORENA: { type: Number, default: 0 },
        UNIDAD: { type: Number, default: 0 },
        PDC: { type: Number, default: 0 }
    },
    votosValidos: { type: Number, default: 0 },
    votosBlancos: { type: Number, default: 0 },
    votosNulos: { type: Number, default: 0 },

    // Estado de confirmación de carga (true si fue exitosamente procesado)
    estado: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('VotoPresidencial', VotoPresidencialSchema);
