/*   /api/subirarchivo   */

const {Router} = require('express');
const {check} = require('express-validator');
const fileUpload = require('express-fileupload');

const {validar} = require('../middleware/validations');
const {validarToken} = require('../middleware/validation-token');
const { putArchivo, retornaImagen} = require('../controller/subirArchivoControllers');

const router = Router();
router.use(fileUpload());

router.put('/:tabla/:id', 
    [
        validarToken,
    ],
    putArchivo
);
router.get('/:tabla/:foto', retornaImagen);

module.exports = router;