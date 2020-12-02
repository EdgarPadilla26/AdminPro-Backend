/*       '/api/usuario'         */

const {Router} = require('express');
const { check } = require('express-validator');

const {validar} = require('../middleware/validations');
const {validarToken} = require('../middleware/validation-token');
const { getUsuarios, crearUsuarios, updateUsuario, deleteUsuario } = require('../controller/usuarioController');

const router = Router();

router.get('/', validarToken ,getUsuarios);

router.post('/',
    [
	
        check('nombre', 'no se capturo el nombre').not().isEmpty(),
        check('password', 'no se capturo el password').not().isEmpty(),
        check('email', 'no se capturo el email').isEmail(),
        validar,
    ],
    crearUsuarios
);


router.put('/:id',
    [
        validarToken,
        check('nombre', 'no se capturo el nombre').not().isEmpty(),
        check('email', 'no se capturo el email').isEmail(),
        validar,
    ],
    updateUsuario,
);

router.delete('/:id',
    [
        validarToken
    ],
    deleteUsuario,
);

module.exports = router;
