/*     '/api/medico'      */

const {Router} = require('express');
const { check } = require('express-validator');

const {validar} = require('../middleware/validations');
const {validarToken} = require('../middleware/validation-token');
const { getMedicos, crearMedico, updateMedico, deleteMedico } = require('../controller/medicoControllers');

const router = Router();

router.get('/', validarToken , getMedicos);

router.post('/', 
    [
        validarToken,
        check('nombre', 'No se ha capturado el nombre').not().isEmpty(),
        check('nombrehospital', 'No es un ID valido').isMongoId(),
        validar
    ],
    crearMedico
);


router.put('/:id', 
    [
    ],
    updateMedico,
);

router.delete('/:id',
    [
    ], 
    deleteMedico,
);

module.exports = router;