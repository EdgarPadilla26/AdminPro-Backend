/*       '/api/auth'         */
const {Router} = require('express');
const {check} = require('express-validator');

const {validar} = require('../middleware/validations');
const {login, loginGoogle} = require('../controller/authControllers');

const router = Router();

router.post('/', 
    [
        check('password', 'no se capturo el password').not().isEmpty(),
        check('email', 'no se capturo el email').isEmail(),
        validar,
    ],
    login
);

router.post('/google', 
    [
        check('token', 'no se capturo el token de google').not().isEmpty(),
        validar,
    ],
    loginGoogle
);


module.exports = router;