/*     '/api/hospital'      */

const {Router} = require('express');
const { check } = require('express-validator');

const {validar} = require('../middleware/validations');
const {validarToken} = require('../middleware/validation-token');
const {getHospitales, crearHospital, updateHospital, deleteHospital } = require('../controller/hospitalControllers');

const router = Router();

router.get('/', validarToken, getHospitales);

router.post('/', 
    [
        validarToken,
        check('nombre', 'No se coloco nombre de hospital').not().isEmpty(),
        validar,
    ],
    crearHospital
);


router.put('/:id', 
    [
    ],
    updateHospital,
);

router.delete('/:id',
    [
    ], 
    deleteHospital,
);

module.exports = router;