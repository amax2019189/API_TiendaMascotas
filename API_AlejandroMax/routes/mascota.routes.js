const { Router } = require('express');
const { check } = require('express-validator');

const { mascotaPost, getMascotaByid, mascotaGet, mascotaPut, mascotaDelete } = require('../controllers/mascota.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeMascotaById } = require('../helpers/db-validators');

const router = Router();

router.get("/", mascotaGet);

router.get(
    "/:id",
    [
        check("id","El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaById),
        validarCampos
    ], getMascotaByid);

router.put(
    "/:id",
    [
        check("id","El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaById),
        validarCampos
    ], mascotaPut);


router.delete(
    "/:id",
    [
        check("id","El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaById),
        validarCampos
    ], mascotaDelete);

router.post(
    "/",
    [
        check("nombre","El nombre es obligatorio").not().isEmpty(),
        check("especie","La especie es obligatoria"),
        check("sexo","El sexo de la mascota es necesario"),
        check("peso","El peso de la mascota es necesario"),
        validarCampos
    ], mascotaPost);

module.exports = router;