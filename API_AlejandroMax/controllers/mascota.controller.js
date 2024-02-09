const { response, query } = require('express');
const bcryptjs = require('bcryptjs');
const Mascotas = require('../models/mascota');
const mascota = require('../models/mascota');

const mascotaGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true};

    const [total,mascota] = await Promise.all([
        Mascotas.countDocuments(query),
        Mascotas.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        mascota
    });
}

const getMascotaByid = async (req, res) => {
    const { id } = req.params;
    const mascota = await Mascotas.findOne({_id: id});

    res.status(200).json({
        mascota
    });
}

const mascotaPut = async (req, res) => {
    const { id } = req.params;
    const { _id, sexo, ...resto} =req.body;
    
    const mascota = await Mascotas.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Mascota Actualizada exitosamente'
    });
}

const mascotaDelete = async (req, res) => {
    const {id} = req.params;
    const mascota = await Mascotas.findByIdAndUpdate(id,{estado: false});

    res.status(200).json({
        msg: 'Mascota Eliminada Exitosamente'
    });
}

const mascotaPost = async (req, res) => {
    const { nombre, especie, sexo, peso, estado } = req.body;
    const mascotas = new Mascotas({nombre, especie, sexo, peso });

    const salt = bcryptjs.genSaltSync();

    await mascotas.save();
    res.status(200).json({
        mascotas
    });
}

module.exports = {
    mascotaPost,
    mascotaGet,
    mascotaPut,
    mascotaDelete,
    getMascotaByid
}