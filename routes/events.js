/**
 * Event routes
 * /api/events
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

const { isDate } = require('../helpers/isDate');

const router = Router();

//todas las peticiones a continuación deben pasar por la validación de jwt
//si se quieren que sean públicas deben declararse antes de la sgte sentencia
router.use(validarJWT);


router.get('/', getEventos);

router.post(
    '/',
    [
        check('title', 'EL título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento
);

router.put('/:id', actualizarEvento);

router.delete('/:id', eliminarEvento);

module.exports = router;