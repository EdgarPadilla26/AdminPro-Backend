/*   /api/busqueda   */

const {Router} = require('express');
const {check} = require('express-validator');

const {validar} = require('../middleware/validations');
const {validarToken} = require('../middleware/validation-token');
const{ getBusqueda, getBusquedaColeccion } = require('../controller/busquedaControllers');

const router = Router();

router.get('/:search', 
    [
        validarToken
    ],
    getBusqueda
);

router.get('/coleccion/:tabla/:search', 
    [
        validarToken,
    ],
    getBusquedaColeccion
);

module.exports = router;