const path = require('path');
const fs = require('fs');

const {response} = require('express');
const { v4: uuidv4 } = require('uuid');
const { asignarArchivo } = require('../helpers/asignar');

const putArchivo = async(req, resp = response) =>{

    const tabla = req.params.tabla;
    const uid = req.params.id;

    try {
        const pathValido = [ 'usuarios', 'medicos', 'hospitales' ];

        //Validar path de la imagen
        if(!pathValido.includes(tabla)){
            return resp.status(400).json({
                ok: false,
                msg: 'No existe la ruta que se indica',
            });
        }

        //Validar que exista imagen
        if (!req.files || Object.keys(req.files).length === 0) {
            return resp.status(400).json({
                ok: false,
                mgs: 'No files were uploaded.'
            });
        }

        const file = req.files.imagen;
        const cortarExtension = file.name.split('.');
        const extension = cortarExtension[cortarExtension.length-1];

        //Validar extension de la imagen
        const extensionValida = ['png', 'jpg', 'jpeg', 'gif'];
        if(!extensionValida.includes(extension)){
            return resp.status(400).json({
                ok: false,
                mgs: 'Inserta una imagen con extension valida (.png, .jpg, .jpeg, .gif)'
            });
        }

        //Generar nombre de la imagen para almacenarla
        const nombreArchivo = `${uuidv4()}.${extension}`;

        //Path de almacenamiento
        const path = `./uploads/${tabla}/${nombreArchivo}`;

        // Use the mv() method to place the file somewhere on your server
        file.mv(path, err => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    msg: 'no se guardo la imagen correctamente'
                });
            }
            //Asignar archivo
            asignarArchivo(tabla,uid,nombreArchivo);

            resp.json({
                        ok: true,
                        nombreArchivo,
                        msg: 'Imagen subida',
                    });
        });

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Se produjo un error',
        }); 
    }
}

const retornaImagen = (req, resp = response)=>{

    const tabla = req.params.tabla;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${tabla}/${foto}` );

    if(!fs.existsSync(pathImg)){
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg` );
        resp.sendFile(pathImg);
    }
    
    resp.sendFile(pathImg);
}


module.exports={
    putArchivo,
    retornaImagen
}