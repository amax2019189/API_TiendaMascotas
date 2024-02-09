const Mascotas = require('../models/mascota');
const Usuario = require('../models/usuario');
 
const existenteEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El email ${ correo } ya fue registrado`);
    }
}
 
const existeUsuarioById = async ( id = '') => {
    const existeUsuario = await Usuario.findOne({id});
    if(existeUsuario){
        throw new Error(`El usuario con el ${ id } no existe`);
    }
}

const existeMascotaById = async ( id = '') => {
    const existeMascota = await Mascotas.findOne({id});
    if(existeMascota){
        throw new Error(`La mascota con el ${ id } no existe`);
    }
} 
 
module.exports = {
    existenteEmail,
    existeUsuarioById,
    existeMascotaById
}