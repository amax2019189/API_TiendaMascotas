const { Schema, model } = require('mongoose');

const MascotasSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    especie: {
        type: String,
        require: [true, 'La especie es obligatoria']
    },
    sexo: {
        type: String,
        require: [true, 'El sexo de la mascota es necesario']
    },
    peso: {
        type: String,
        require: [true, 'El peso de la mascota es oblgatorio']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('mascota', MascotasSchema);